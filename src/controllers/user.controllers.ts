import { Request, Response } from "express";
import { getAllRole, getAllUser, getDetailAUser, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.services";
const getHomePage = async (req: Request, res: Response) => {
    return res.render('client/home/show.ejs');
}
const getCreateNewUser = async (req: Request, res: Response) => {
    const roles = await getAllRole();
    return res.render('admin/user/create.ejs', {
        roles
    });
}
const postCreateNewUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { fullName, username, phone, address, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    await handleCreateUser(fullName, username, phone, address, avatar, role);
    return res.redirect('/admin/user');
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect('/admin/user');
}
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, username, phone, address, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    await handleUpdateUser(id, fullName, username, address, role, phone, avatar);
    return res.redirect('/admin/user');
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getDetailAUser(id);
    const roles = await getAllRole();
    return res.render('admin/user/detail.ejs', { id: id, user: user, roles });
}

export { getHomePage, getCreateNewUser, postCreateNewUser, postDeleteUser, getViewUser, postUpdateUser }