import { Request, Response } from "express";
const getDashBoardAdmin = async (req: Request, res: Response) => {

    return res.render('admin/dashboard.ejs');
}
export { getDashBoardAdmin };