const { commit } = require('../models/index');

// const getAllCommit = async (req, res) => {};
const getByIdCommit = async (req, res) => {
	try {
		const data = await commit.findByPk(req.params.id);
		if (!data) {
			return res.status(401).send({ message: 'Commit is not definty' });
		}
		res.status(200).send({ message: 'Get commit successfully', data });
	} catch (error) {
		console.log(error);
	}
};

const addCommit = async (req, res) => {
	try {
		const newData = await commit.create({
			text: req.body.text,
			userName: req.user.fullName,
			diaryId: req.params.diaryId,
			userId: req.user.id,
		});
		res.status(201).send({ message: 'Created successfully', newData });
	} catch (error) {
		console.log(error);
	}
};
// const updateCommit = async (req, res) => {};
// const deleteCommit = async (req, res) => {};

module.exports = {
	// getAllCommit,
	getByIdCommit,
	addCommit,
	// updateCommit,
	// deleteCommit,
};
