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
    return connection;
}
export { getConnection }
