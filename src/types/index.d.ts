import { User as UserPrisma, Profile } from "@prisma/client";

type UserRole = User & Role;

declare global {
    namespace Express {
        interface User extends UserPrisma {
            role?: Role,
            sumCartUser?: number
        }
    }
}