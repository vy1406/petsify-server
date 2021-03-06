if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
// import { pool } from './src/db/db-connection';
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const cookieParser = require('cookie-parser');
const initializePassport = require('./passport-config');
// -----------------------------
// START - DB
// -----------------------------
// for login
const users = [
	{
		id: '1606740996282',
		name: 'lol',
		email: 'w@w',
		password: '$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66'
	}
]; // instead of db

// OPTION 1
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
});

// OPTION 2
// app.use(
// 	cors({
// 		origin:
// 			process.env.NODE_ENV === 'production'
// 				? ''
// 				: ['http://localhost:3001', 'http://localhost:3002'],
// 		credentials: true
// 	})
// );
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false, // should we resave our session variable if nothing has changed
		saveUninitialized: false, // do you wanna save an empty value in a session if there is no value
		cookie: {
			expires: new Date(Date.now() + 3600000 * 24 * 30),
			maxAge: 3600000 * 24 * 30,
			secure: false
		}
	})
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport(
	passport,
	email => users.find(user => user.email === email),
	id => users.find(user => user.id === id)
);

// ---------------------
// middleware to check if user cannot visit pages when he is NOT logged in
// ---------------------
function checkNotAuthenticated(req, res, next) {
	console.log('req.isAuthenticated() > ', req.isAuthenticated());
	if (req.isAuthenticated()) {
		return res.send('not authorized');
	}
	next();
}

// ---------------------
// middleware to check if user cannot visit pages when he IS logged in
// ---------------------
function checkAuthenticated(req, res, next) {
	console.log('req.isAuthenticated()', req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	}
	res.send('not authenticated');
}

app.get('/web/for_not_authorized', checkNotAuthenticated, (req, res) => {
	res.send('all who are not authorized route');
});

app.get('/web/private', checkAuthenticated, (req, res) => {
	res.send('private route');
});

app.get('/web/everybody', (req, res) => {
	res.send('everybody route');
});

app.post('/web/logout', checkAuthenticated, (req, res) => {
	console.log('logging out');
	req.logOut();
	res.send('logout');
});

app.post('/web/login', checkNotAuthenticated, (req, res, next) => {
	passport.authenticate('local', (error, user) => {
		req.login(user, error => {
			if (error) {
				return next(error);
			}
			return res.json({ success: true, user: req.user });
		});
	})(req, res, next);
});

app.post('/web/register', checkNotAuthenticated, async (req, res) => {
	// try {
	// 	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	// 	const userToAdd = {
	// 		firstName: req.body.firstName,
	// 		lastName: req.body.lastName,
	// 		username: req.body.username,
	// 		email: req.body.email,
	// 		hash: hashedPassword
	// 	};
	// 	const q = `INSERT INTO users (username, email, hash, first_name, last_name)
	// 	VALUES ('${userToAdd.username}', '${userToAdd.email}', '${userToAdd.hash}', '${userToAdd.firstName}', '${userToAdd.lastName}')`;
	// 	pool.query(q, (err, res) => {
	// 		console.log(err, res);
	// 		pool.end();
	// 	});
	// 	res.send(`registered.., user ${userToAdd.email} was added to db`);
	// } catch (error) {
	// 	res.send('some error');
	// }
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on port ' + port));
