import { hashPassWord } from "services/user.services";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const cntUser = await prisma.user.count();
    const cntRole = await prisma.role.count();
    const defaultHashPassWord = await hashPassWord("123456");
    if (cntUser === 0) {
        await prisma.user.createMany({
            data:
                [
                    {
                        fullName: "Tohuythong",
                        username: "thong123",
                        password: defaultHashPassWord,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        address: "vietnam"

                    },
                    {
                        fullName: "Tothong",
                        username: "thong69",
                        password: defaultHashPassWord,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        address: "haiduong"

                    }
                ]
        })
    }
    else if (cntRole === 0) {
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
    else {
        console.log("already init data");
    }

}

export default initDatabase;