import { Request, Response } from "express";
import { getAllUser, handleCreateUser } from "../services/user.services";
const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUser();

    return res.render('home.ejs', {
        users: users
    });
}
const getCreateNewUser = (req: Request, res: Response) => {
    return res.render('create-user.ejs')
}
const postCreateNewUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { fullName, email, address } = req.body;
    await handleCreateUser(fullName, email, address);
    return res.redirect('/');
}

export { getHomePage, getCreateNewUser, postCreateNewUser }