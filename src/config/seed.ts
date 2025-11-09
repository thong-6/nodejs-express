import { hashPassWord } from "services/user.services";
import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const cntUser = await prisma.user.count();
    const cntRole = await prisma.role.count();
    const defaultHashPassWord = await hashPassWord("123456");
    const roleAdmin = await prisma.role.findFirst({
        where: {
            name: "ADMIN"
        }
    })
    if (cntRole === 0) {
        await prisma.role.createMany({
            data:
                [
                    {
                        name: "ADMIN",
                        description: "Admin thì full quyền"

                    },
                    {
                        name: "USER",
                        description: "User thông thường"

                    }
                ]
        })
    }
    if (cntUser === 0) {
        await prisma.user.createMany({
            data:
                [
                    {
                        fullName: "Tohuythong",
                        username: "thong123",
                        password: defaultHashPassWord,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        address: "vietnam",
                        RoleId: roleAdmin.id

                    },
                    {
                        fullName: "Tothong",
                        username: "thong69",
                        password: defaultHashPassWord,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        address: "haiduong",
                        RoleId: roleAdmin.id

                    }
                ]
        })
    }

    if (cntRole !== 0 && cntUser !== 0) {
        console.log("already init data");
    }

}

export default initDatabase;