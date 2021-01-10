import dotenv from 'dotenv';
import connect, { ConnectionPool } from 'pg';
dotenv.config();

export const getDbConnection = (): ConnectionPool => {
	const connectionString = process.env.DATABASE_URL;
	if (connectionString) {
		console.log(connectionString);
		return connect(connectionString);
	} else {
		process.exit(1);
	}
};
