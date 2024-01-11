import mysql from 'mysql2/promise.js';
export const con = await mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'MAIN&&pain22',
	database: 'movie_library',
});
