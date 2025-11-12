import { Request, Response } from "express";
import { getProduct, getProductById } from "services/client/item.service";
const getDetailProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    return res.render('client/product/detail.ejs', {
        product
    });
}
export { getDetailProductPage }