import { Request, Response } from "express";
import { handleCreateUser } from "../services/user.services";
const getHomePage = (req: Request, res: Response) => {
    return res.render('home.ejs');
}
const getCreateNewUser = (req: Request, res: Response) => {
    return res.render('create-user.ejs')
}
const postCreateNewUser = (req: Request, res: Response) => {
    console.log(req.body);
    const { fullName, email, address } = req.body;
    handleCreateUser(fullName, email, address);
    return res.redirect('/');
}

export { getHomePage, getCreateNewUser, postCreateNewUser }