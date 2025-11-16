import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassWord } from "services/user.services";

const getEmailUnique = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { username: email },
    });
    if (user) return true;
    return false;
}
const registerNewUser = async (fullName: string, username: string, password: string) => {
    const userRole = await prisma.role.findUnique({
        where: {
            name: 'USER'
        }
    })
    const newPassword = await hashPassWord(password);
    if (userRole) {
        await prisma.user.create({
            data: {
                fullName: fullName,
                username: username,
                password: newPassword,
                RoleId: userRole.id,
                accountType: ACCOUNT_TYPE.SYSTEM
            }
        })
    }
    else {
        throw new Error("User Role không tồn tại")
    }
}

const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    });
    return user;
}

export {
    getEmailUnique, registerNewUser, getUserWithRoleById
}