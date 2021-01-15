import _ from 'lodash';
const pool = require('../db-connection');
// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config();
// }

const main = async () => {
	const createUser = async (
		firstName: string,
		lastName: string,
		email: string,
		hash: string,
		role: string
	): Promise<void> => {
		const q = `INSERT INTO users (first_name, last_name, email, hash, role)
		VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${role}');`;
		await pool.query(q);
	};

	const createPetType = async (name: string): Promise<void> => {
		const q = `INSERT INTO pet_types (name)
		VALUES ('${name}');`;
		await pool.query(q);
	};

	const createBreed = async (name: string): Promise<void> => {
		const q = `INSERT INTO breeds (name)
		VALUES ('${name}');`;
		await pool.query(q);
	};

	const createPet = async (
		ownerId: number,
		petTypeId: number,
		breedId: number | null,
		name: string
	): Promise<void> => {
		const q = `INSERT INTO pets (owner_id, pet_type_id, breed_id, name)
		VALUES (${ownerId}, ${petTypeId}, ${breedId}, '${name}');`;
		await pool.query(q);
	};

	const loadBreeds = async () => {
		await createBreed('chiwawa');
		await createBreed('husky');
		await createBreed('canadian sfinx');
		await createBreed('britanian');
		await createBreed('shinshila');
		await createBreed('alexandrin');
	};

	const loadPetTypes = async () => {
		await createPetType('dog');
		await createPetType('cat');
		await createPetType('parrot');
	};

	const loadPets = async () => {
		await createPet(1, 1, 2, 'rojo');
		await createPet(1, 3, 6, 'cherchil');
		await createPet(2, 2, 4, 'slavik');
		await createPet(3, 1, 1, 'mike');
	};

	const loadUsers = async () => {
		await createUser(
			'vova',
			'yel',
			'velisave@gmail.com',
			'$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66',
			'admin'
		);
		await createUser(
			'nadya',
			'mg',
			'nadya@gmail.com',
			'$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66',
			'secretary'
		);
		await createUser(
			'dima',
			'sol',
			'soldurifi@gmail.com',
			'$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66',
			'client'
		);
		await createUser(
			'gavrik',
			'gavrilyuk',
			'gavrik@gmail.com',
			'$2b$10$mHZ8v109Mkh/lbG7t7PNuOMf/gAhiGYIVkXJqJCFK2uJCRfSTdM66',
			'client'
		);
	};

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log('Migration start');
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

	// const migrationInstance = Migration.getInstance();
	await loadUsers();
	await loadPetTypes();
	await loadBreeds();
	await loadPets();

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
