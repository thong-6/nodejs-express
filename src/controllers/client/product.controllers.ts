import { prisma } from "config/client";
import { Request, Response } from "express";
import { addProductToCart, deleteProductCart, getDetailCart, getProductById, handlePlaceOrder } from "services/client/item.service";
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

const postDeleteProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteProductCart(+id);

    return res.redirect('/cart')
}

const getCheckoutPage = async (req: Request, res: Response) => {
    const { id } = req.user;
    const detailCartsProducts = await getDetailCart(id)
    const totalPrice = detailCartsProducts.map(item => item.price).reduce((a, b) => a + b, 0)
    return res.render('client/product/checkout.ejs', {
        detailCartsProducts, totalPrice
    });
}

const getPlaceOrderPage = async (req: Request, res: Response) => {
    const user = req.user
    const { receiverName, receiverPhone, receiverAddress, totalPrice } = req.body
    if (user) {
        await handlePlaceOrder(+user.id, receiverAddress, receiverName, receiverPhone, +totalPrice)
        res.redirect('/thank-you')
    }

    return res.redirect('/thank-you')
}
const getThanksPage = async (req: Request, res: Response) => {


    return res.render('client/product/thanks.ejs')
}


export {
    getDetailProductPage, getPlaceOrderPage, getThanksPage,
    postAddProductToCart, getCartPage, postDeleteProductToCart, getCheckoutPage
}