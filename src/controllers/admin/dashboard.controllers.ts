import { Request, Response } from "express";
import { countData } from "services/admin/dashboard.service";
import { getAllOrder } from "services/admin/order.service";
import { getAllProduct } from "services/admin/product.service";
import { getAllUser } from "services/user.services";
const getDashBoardAdmin = async (req: Request, res: Response) => {
    const cntData = await countData()
    return res.render('admin/dashboard/show.ejs', {
        cntData
    });
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUser();
    return res.render('admin/user/show.ejs', {
        users
    });
}


const getAdminOrderPage = async (req: Request, res: Response) => {
    const orders = await getAllOrder();
    return res.render('admin/order/show.ejs', {
        orders
    });
}
const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProduct();
    return res.render('admin/product/show.ejs', {
        products
    });
}
export { getDashBoardAdmin, getAdminUserPage, getAdminOrderPage, getAdminProductPage };