const { diary } = require('../models/index');

const getAll = async (req, res) => {
	try {
		const data = await diary.findAll({
			where: { userId: req.user.id },
			raw: true,
			plain: false,
			include: ['users'],
			nest: true,
		});
		if (!data) {
			return res.status(403).json({ error: 'Diary is not definty' });
		}
		res.status(200).send(data);
	} catch (error) {
		console.log(error);
	}
};

const getById = async (req, res) => {
	try {
		const id = req.params.id;
		const oneData = await diary.findByPk(id, {
			raw: false,
			plain: true,
			include: ['commits', 'users'],
			nest: true,
		});
		if (!oneData) {
			return res.status(200).json({ message: 'Data is not definty' });
		}
		res.status(200).json(oneData);
	} catch (error) {
		console.log(error);
	}
};

const addDiary = async (req, res) => {
	const { text } = req.body;
	try {
		console.log(req.file, text);
		const newData = await diary.create({
			img: '/' + req.file.filename, // http://localhost:3000/img-1694542948911-.png
			text: text,
			userId: req.user.id,
		});
		res.status(201).json(newData);
	} catch (error) {
		console.log(error);
	}
};

const updateDiary = async (req, res) => {
	try {
		await diary.update(req.body, { where: { id: req.params.diaryId } });
		res.status(200).json({ message: 'Updated successfully' });
	} catch (error) {
		console.log(error);
	}
};

const deleteDiary = async (req, res) => {
	try {
		await diary.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: 'delete successfully' });
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getAll, addDiary, getById, updateDiary, deleteDiary };
