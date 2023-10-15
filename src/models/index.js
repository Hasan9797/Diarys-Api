const { Sequelize, DataTypes } = require('sequelize');
const { user, server, password, database, port } = require('../config/db');

const sequelize = new Sequelize(database, user, password, {
	host: server,
	port: port,
	dialect: 'postgres',
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.diary = require('./diary')(sequelize, DataTypes);
db.commit = require('./commit')(sequelize, DataTypes);
db.Users = require('./users')(sequelize, DataTypes);

db.diary.hasMany(db.commit, {
	as: 'commits',
	oneDelete: 'CASCADE',
	constraints: true,
});
db.commit.belongsTo(db.diary, { foreignKey: 'diaryId', as: 'diarys' });

db.Users.hasMany(db.diary, {
	as: 'diarys',
	oneDelete: 'CASCADE',
	constraints: true,
});
db.diary.belongsTo(db.Users, { foreignKey: 'userId', as: 'users' });

db.Users.hasMany(db.commit, {
	as: 'commits',
	oneDelete: 'CASCADE',
	constraints: true,
});
db.commit.belongsTo(db.Users, { foreignKey: 'userId', as: 'users' });

// db.diary.hasMany(db.Users, {
// 	as: 'users',
// 	oneDelete: 'CASCADE',
// 	constraints: true,
// });
// db.Users.belongsTo(db.diary, { foreignKey: 'diaryId', as: 'diarys' });

module.exports = db;
