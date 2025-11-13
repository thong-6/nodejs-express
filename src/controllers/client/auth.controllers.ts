import { Request, Response } from "express";
const getRegisterPage = (req: Request, res: Response) => {
    return res.render('client/auth/register.ejs')
}
const getLoginPage = (req: Request, res: Response) => {
    return res.render('client/auth/login.ejs')
}
export {
    getRegisterPage, getLoginPage
}