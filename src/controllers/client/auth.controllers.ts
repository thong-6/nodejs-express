import { Request, Response } from "express";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validations/register.schema";
const getRegisterPage = (req: Request, res: Response) => {
    const data = {
        fullName: ""
        , username: ""
        , password: ""
        , confirmPassword: ""
    }
    const errors = []
    return res.render('client/auth/register.ejs', {
        data, errors
    })
}
const postRegisterPage = async (req: Request, res: Response) => {
    const { fullName, username, password, confirmPassword } = req.body as TRegisterSchema;
    const validate = await RegisterSchema.safeParseAsync(req.body);

    if (!validate.success) {
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const data = {
            fullName, username, password, confirmPassword
        }
        return res.render('client/auth/register.ejs', {
            errors, data
        });
    }
    await registerNewUser(fullName, username, password);
    return res.redirect('/login');
}
const getLoginPage = (req: Request, res: Response) => {
    return res.render('client/auth/login.ejs')
}
export {
    getRegisterPage, getLoginPage, postRegisterPage
}