import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
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
        return cb(null, user);
    }))
    passport.serializeUser(function (user: any, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}
export default configPassport;

