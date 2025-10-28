// Get the client
import mysql from 'mysql2/promise';


const getConnection = async () => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '060925',
        database: 'nodejs',
    });
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `user`'
        );

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }
}
export { getConnection }
