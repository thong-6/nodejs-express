import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user.services";
const configPassport = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, cb) {
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = []
        }
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (!user) {
            return cb(null, false, { message: `Username or password invalid` })
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return cb(null, false, { message: `Username or password invalid` });
        return cb(null, user as any);
    }))
    passport.serializeUser(function (user: any, cb) {
        cb(null, { id: user.id, username: user.username });
    });

    passport.deserializeUser(async function (user: any, cb) {
        const { id, username } = user;
        const userInDB = await getUserWithRoleById(id);
        return cb(null, userInDB);
    });
}
export default configPassport;

