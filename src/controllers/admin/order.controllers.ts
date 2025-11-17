import { Request, Response } from "express";
import { getDetailOrder } from "services/admin/order.service";
const getViewOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const orderDetails = await getDetailOrder(id);



    return res.render('admin/order/detail.ejs', { id, orderDetails });
}
export {
    getViewOrder
}