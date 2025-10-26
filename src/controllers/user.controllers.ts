import { Request, Response } from "express";
const getHomePage = (req: Request, res: Response) => {
    return res.render('home.ejs');
}
const getCreateNewUser = (req: Request, res: Response) => {
    return res.render('create-user.ejs')
}

export { getHomePage, getCreateNewUser }