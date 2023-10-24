const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

// Session setup
const session = require('express-session');
const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './upload')));

const { sequelize } = require('./models/index');
const diaryRouter = require('./routers/diary');
const commintRouter = require('./routers/commint');
const authRouter = require('./routers/auth');

//  Session connect
app.use(
	session({
		store: new pgSession({
			pool: new pg.Pool(require('./config/db')),
			tableName: 'users_session',
		}),
		secret: 'myKey',
		resave: false,
		saveUninitialized: true,
	})
);

app.use('/api/diary', diaryRouter);
app.use('/api/commit', commintRouter);
app.use('/api/auth', authRouter);

function start() {
	try {
		sequelize.authenticate().then(() => {
			console.log('Connection established successfully.');
		});
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, console.log(`Server on PORT: ${PORT}`));
	} catch (error) {
		console.log(error);
	}
}
start();
