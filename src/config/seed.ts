import { prisma } from "./client";

const initDatabase = async () => {
    const cnt = await prisma.user.count();
    if (cnt === 0) {
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
    else {
        console.log("already init data");
    }

}

export default initDatabase;