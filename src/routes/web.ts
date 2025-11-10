import express, { Express } from "express";

import { getCreateNewUser, getHomePage, getViewUser, postCreateNewUser, postDeleteUser, postUpdateUser } from "controllers/user.controllers";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardAdmin } from "controllers/admin/dashboard.controllers";
import fileUploadMiddleware from "src/middleware/multer";
import { getDetailProductPage } from "controllers/client/product.controllers";
import { getCreateNewProduct, postCreateNewProduct } from "controllers/admin/product.controllers";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    //client
    router.get('/product/:id', getDetailProductPage)
    //admin
    router.get('/admin', getDashBoardAdmin);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateNewUser);
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/product', getAdminProductPage);
    router.post('/admin/create-user', fileUploadMiddleware('avatar'), postCreateNewUser);
    router.post('/admin/delete-user/:id', postDeleteUser);
    router.get('/admin/view-user/:id', getViewUser);
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUser);
    router.get('/admin/create-product', getCreateNewProduct);
    router.post('/admin/create-product', fileUploadMiddleware('avatar', '/images/product'), postCreateNewProduct);
    app.use('/', router);
}
export default webRoutes;