const { Users } = require('../models/index');
const bcrypt = require('bcrypt');

const regester = async (req, res) => {
	try {
		const cheakUser = await Users.findOne({ where: { email: req.body.email } });
		if (cheakUser) {
			return res.status(400).json({ message: 'there is a user of this' });
		}
		const hashingPassword = await bcrypt.hash(req.body.password, 10);

		const newUser = await Users.create({
			fullName: req.body.fullName,
			email: req.body.email,
			password: hashingPassword,
		});
		res.status(201).json({ message: 'Created successfully', newUser });
	} catch (error) {
		console.log(error);
	}
};

const login = async (req, res) => {
	try {
		const cheakUser = await Users.findOne({
			where: { email: req.body.email },
		});
		if (!cheakUser) {
			return res.status(401).json({ message: 'User is not Authorization' });
		}
		const checkgPassword = await bcrypt.compare(
			req.body.password,
			cheakUser.password
		);

		if (!checkgPassword) {
			return res.status(400).json({ message: 'Email or password wrong' });
		}

		req.session.user = cheakUser.dataValues;
		req.session.auth = true;
		res.status(200).json({ message: 'User authenticated' });
	} catch (error) {
		console.log(error);
	}
};

const logout = async (req, res) => {
	try {
		await req.session.destroy();
		res.status(200).json({ message: 'Successfully logged out' });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	regester,
	login,
	logout,
};
