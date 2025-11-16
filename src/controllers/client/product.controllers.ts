import { Request, Response } from "express";
import { addProductToCart, getDetailCart, getProductById } from "services/client/item.service";
const getDetailProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    return res.render('client/product/detail.ejs', {
        product
    });
}
const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (user) {
        await addProductToCart(1, id, user);
    }
    else {
        return res.redirect('/login')
    }
    return res.redirect('/')
}

const getCartPage = async (req: Request, res: Response) => {
    const { id } = req.user;
    const detailCartsProducts = await getDetailCart(id)
    const totalPrice = detailCartsProducts.map(item => item.price).reduce((a, b) => a + b, 0)
    return res.render('client/product/cart.ejs', {
        detailCartsProducts, totalPrice
    });
}

export {
    getDetailProductPage,
    postAddProductToCart, getCartPage
}