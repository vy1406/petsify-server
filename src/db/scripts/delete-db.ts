import _ from 'lodash';
const pool = require('../db-connection');

const main = async () => {
	const DB_TABLES = ['user_roles', 'users', 'roles'];

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Reset db start');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

	const tableRoles = `DROP TABLE IF EXISTS pet_types CASCADE;`;
	await pool.query(tableRoles);

	const tableBreeds = `DROP TABLE IF EXISTS breeds CASCADE;`;
	await pool.query(tableBreeds);

	const tableUsers = `DROP TABLE IF EXISTS users CASCADE;`;
	await pool.query(tableUsers);

	const petsTable = `DROP TABLE IF EXISTS pets CASCADE;`;
	await pool.query(petsTable);

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Reset db end');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
};

main().then(() => process.exit(0));
