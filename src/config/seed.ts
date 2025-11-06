import { prisma } from "./client";

const initDatabase = async () => {
    const cntUser = await prisma.user.count();
    const cntRole = await prisma.role.count();
    if (cntUser === 0) {
        await prisma.user.createMany({
            data:
                [
                    {
                        fullName: "Tohuythong",
                        username: "thong123",
                        address: "vietnam"

                    },
                    {
                        fullName: "Tothong",
                        username: "thong69",
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