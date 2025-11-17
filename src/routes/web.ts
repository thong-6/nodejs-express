import express, { Express } from "express";

import { getCreateNewUser, getHomePage, getViewUser, postCreateNewUser, postDeleteUser, postUpdateUser } from "controllers/user.controllers";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardAdmin } from "controllers/admin/dashboard.controllers";
import fileUploadMiddleware from "src/middleware/multer";
import { getCartPage, getCheckoutPage, getDetailProductPage, getPlaceOrderPage, getThanksPage, postAddProductToCart, postDeleteProductToCart } from "controllers/client/product.controllers";
import { getCreateNewProduct, getViewProduct, postCreateNewProduct, postDeleteProduct, postUpdateProduct } from "controllers/admin/product.controllers";
import { getLoginPage, getRedirect, getRegisterPage, postLogout, postRegisterPage } from "controllers/client/auth.controllers";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
import { getViewOrder } from "controllers/admin/order.controllers";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    //client
    router.get('/product/:id', getDetailProductPage)
    //admin
    router.get('/admin', getDashBoardAdmin);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateNewUser);
    router.post('/admin/create-user', fileUploadMiddleware('avatar'), postCreateNewUser);
    router.post('/admin/delete-user/:id', postDeleteUser);
    router.get('/admin/view-user/:id', getViewUser);
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUser);

    //product
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/create-product', getCreateNewProduct);
    router.post('/admin/create-product', fileUploadMiddleware('image', '/images/product'), postCreateNewProduct);
    router.get('/admin/view-product/:id', getViewProduct);
    router.post('/admin/update-product', fileUploadMiddleware('image', '/images/product'), postUpdateProduct);
    router.post('/admin/delete-product/:id', postDeleteProduct);
    //auth
    router.get('/success-login', getRedirect);
    router.get('/register', getRegisterPage);
    router.post('/register', postRegisterPage);
    router.get('/login', isLogin, getLoginPage);
    router.post('/login', passport.authenticate('local', {
        successReturnToOrRedirect: '/success-login',
        failureRedirect: '/login',
        failureMessage: true
    }));
    router.post('/logout', postLogout);

    //order
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/view-order/:id', getViewOrder);
    //cart
    router.get('/cart', getCartPage);
    router.post('/add-product-to-cart/:id', postAddProductToCart);
    router.post('/delete-product-in-cart/:id', postDeleteProductToCart);
    router.get('/checkout', getCheckoutPage);
    router.post('/place-order', getPlaceOrderPage);
    router.get('/thank-you', getThanksPage);
    app.use('/', isAdmin, router);
}
export default webRoutes;