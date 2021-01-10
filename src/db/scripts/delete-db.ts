import _ from 'lodash';
const pool = require('../db-connection');

const main = async () => {
	const DB_TABLES = ['user_roles', 'users', 'roles'];

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Reset db start');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

	const tableRoles = `DROP TABLE IF EXISTS roles CASCADE;`;
	await pool.query(tableRoles);

	const tableUsers = `DROP TABLE IF EXISTS users CASCADE;`;
	await pool.query(tableUsers);

	const tableUserRoles = `DROP TABLE IF EXISTS users_roles;`;
	await pool.query(tableUserRoles);

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Reset db end');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
};

main().then(() => process.exit(0));
