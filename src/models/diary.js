module.exports = (sequelize, DataTypes) => {
	const diarys = sequelize.define('diarys', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		img: {
			type: DataTypes.STRING(250),
			allowNull: false,
		},
		text: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
	});
	return diarys;
};
