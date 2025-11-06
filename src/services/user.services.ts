
import { prisma } from 'config/client'
const handleCreateUser = async (fullName: string, email: string, address: string) => {
    const user = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
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
const handleUpdateUser = async (id: string, fullName: string, email: string, address: string) => {

    const updateUser = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            fullName: fullName,
            username: email,
            address: address
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

export { handleCreateUser, getAllUser, handleDeleteUser, getDetailAUser, handleUpdateUser, getAllRole };