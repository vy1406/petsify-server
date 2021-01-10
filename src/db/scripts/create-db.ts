import _ from 'lodash';
const pool = require('../db-connection');

const main = async () => {
	const DB_TABLES = ['user_roles', 'users', 'roles'];

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Reset db start');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

	console.log('run the sqlCommands.sql in postgres');

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Reset db end');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
};

main().then(() => process.exit(0));
