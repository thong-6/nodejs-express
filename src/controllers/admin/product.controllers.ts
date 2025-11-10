import { Request, Response } from "express";

const getCreateNewProduct = async (req: Request, res: Response) => {
    return res.render('admin/product/create.ejs');
}
const postCreateNewProduct = async (req: Request, res: Response) => {

    return res.redirect('/admin/product');
}
export { getCreateNewProduct, postCreateNewProduct };