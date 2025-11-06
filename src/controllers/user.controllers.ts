import { Request, Response } from "express";
import { getAllUser, getDetailAUser, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.services";
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
    const { fullName, username, phone, accountType, address } = req.body;
    // await handleCreateUser(fullName, username, phone, accountType , address);
    return res.redirect('/');
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect('/');
}
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;
    await handleUpdateUser(id, fullName, email, address);
    return res.redirect('/');
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const aUser = await getDetailAUser(id);
    return res.render('view-user.ejs', { id: id, aUser: aUser });
}

export { getHomePage, getCreateNewUser, postCreateNewUser, postDeleteUser, getViewUser, postUpdateUser }