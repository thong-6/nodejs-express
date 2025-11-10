import { Request, Response } from "express";
const getDetailProductPage = async (req: Request, res: Response) => {

    return res.render('client/product/detail.ejs');
}
export { getDetailProductPage }