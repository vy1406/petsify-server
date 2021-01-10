import _ from 'lodash';
const pool = require('../db-connection');
// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config();
// }

const main = async () => {
	const createUser = async (
		username: string,
		email: string,
		firstName: string,
		lastName: string,
		password: string
	): Promise<void> => {
		const q = `INSERT INTO users (username, email, hash, first_name, last_name)
		VALUES ('${username}', '${email}', '${password}', '${firstName}', '${lastName}');`;
		await pool.query(q);
	};

	const loadUsers = async () => {
		await createUser(
			'velisave2',
			'velisave@gmail.com',
			'vova',
			'yel',
			'$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66'
		);
		await createUser(
			'velisave',
			'velisave@gmail.com',
			'vova',
			'yel',
			'$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66'
		);
		await createUser(
			'soldima',
			'soldurifi@gmail.com',
			'dima',
			'sol',
			'$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66'
		);
	};

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Migration start');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

	// const migrationInstance = Migration.getInstance();
	await loadUsers();
	// const q = `INSERT INTO users (username, email, hash, first_name, last_name)
	// VALUES ('velisave22', 'velisave@gmail.com', '$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66', 'vova', 'yel');`;

	// await pool.query(q);
	// await migrationInstance.main(action, fileName);
	// try {
	// await pool.query(sql`BEGIN;`);
	// 	// await loadUsers();
	// 	await pool.query(sql`COMMIT;`);
	// } catch (err) {
	// 	console.error(`Error when running seed file`);
	// 	await pool.query(sql`ROLLBACK;`);
	// 	console.error(`Error when running seed`);
	// 	console.error(`${err}`);
	// 	process.exit(1);
	// }

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Migration end');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
};

main().then(() => process.exit(0));
