
import { prisma } from 'config/client'
import { ACCOUNT_TYPE } from 'config/constant'
import bcrypt from "bcrypt";
const saltRounds = 10;
const hashPassWord = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds);
}
const comparePassword = async (plainText: string, hashPassword) => {
    return bcrypt.compare(plainText, hashPassword);
}
const handleCreateUser = async (
    fullName: string,
    email: string,
    phone: string,
    address: string,
    avatar: string,
    role: string) => {
    const defaultHashPassWord = await hashPassWord("123456");
    const user = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            phone: phone,
            password: defaultHashPassWord,
            accountType: ACCOUNT_TYPE.SYSTEM,
            address: address,
            avatar: avatar,
            RoleId: +role
        },
    })
}
const handleDeleteUser = async (id: string) => {

    const deleteUser = await prisma.user.delete({
        where: {
            id: +id
        },
    })
}
const handleUpdateUser = async (id: string, fullName: string, username: string, address: string, roleId: string, phone: string, avatar: string) => {

    const updateUser = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            fullName: fullName,
            username: username,
            address: address,
            RoleId: +roleId,
            phone: phone,
            ...(avatar !== undefined && { avatar: avatar })
        },
    })
}
const getAllUser = async () => {
    const users = await prisma.user.findMany();
    return users;
}
const getAllRole = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}
const getDetailAUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id
        },
    })
    return user;
}


export {
    handleCreateUser, getAllUser, handleDeleteUser, getDetailAUser, handleUpdateUser, getAllRole,
    hashPassWord, comparePassword
};