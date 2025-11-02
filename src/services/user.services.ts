import { getConnection } from "config/database";

const handleCreateUser = async (fullName: string, email: string, address: string) => {
    try {
        const connection = await getConnection();
        const sql = 'INSERT INTO `user`(`fullName`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [fullName, email, address];

        const [result, fields] = await connection.execute(sql, values);

        return result;
    } catch (err) {
        console.log(err);
        return [];
    }




}
const getAllUser = async () => {
    const connection = await getConnection();

    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `user`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}
export { handleCreateUser, getAllUser };