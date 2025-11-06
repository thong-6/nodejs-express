import { Request, Response } from "express";
import { getAllRole, getAllUser } from "services/user.services";
const getDashBoardAdmin = async (req: Request, res: Response) => {

    return res.render('admin/dashboard/show.ejs');
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUser();
    return res.render('admin/user/show.ejs', {
        users
    });
}

const getAdminCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRole();
    return res.render('admin/user/create.ejs', {
        roles
    });
}
const getAdminOrderPage = async (req: Request, res: Response) => {

    return res.render('admin/order/show.ejs');
}
const getAdminProductPage = async (req: Request, res: Response) => {

    return res.render('admin/product/show.ejs');
}
export { getDashBoardAdmin, getAdminUserPage, getAdminOrderPage, getAdminProductPage, getAdminCreateUserPage };