module.exports = (sequelize, DataTypes) => {
	const commit = sequelize.define('commits', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		userName: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
	});
	return commit;
};
