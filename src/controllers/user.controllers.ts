import { Request, Response } from "express";
const getHomePage = (req: Request, res: Response) => {
    return res.render('home.ejs');
}
const getCreateNewUser = (req: Request, res: Response) => {
    return res.render('create-user.ejs')
}
const postCreateNewUser = (req: Request, res: Response) => {
    console.log(req.body);
    return res.redirect('/');
}

export { getHomePage, getCreateNewUser, postCreateNewUser }