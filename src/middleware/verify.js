const verify = (req, res, next) => {
	const cheakAuth = req.session.auth || false;

	if (!cheakAuth) {
		return res.status(401).json({ message: 'User is not authenticated' });
	}
	req.user = req.session.user;
	next();
};

module.exports = { verify };
