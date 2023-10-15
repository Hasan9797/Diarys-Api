module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		fullName: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unequ: true,
		},
		password: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
	});
	return users;
};
