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
const handleDeleteUser = async (id: string) => {

    try {
        const connection = await getConnection();
        const sql = 'DELETE FROM `user` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);


        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}
const handleUpdateUser = async (id: string, fullName: string, email: string, address: string) => {

    try {
        const connection = await getConnection();
        const sql = 'UPDATE `user` SET `fullName` = ?, `email`=?, `address`=? WHERE `id` = ?';
        const values = [fullName, email, address, id];

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
const getDetailAUser = async (id: string) => {
    const connection = await getConnection();

    try {
        const sql = 'SELECT * FROM `user` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);
        return result[0];
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { handleCreateUser, getAllUser, handleDeleteUser, getDetailAUser, handleUpdateUser };