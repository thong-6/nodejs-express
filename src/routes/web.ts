import express, { Express } from "express";

import { getCreateNewUser, getHomePage, getViewUser, postCreateNewUser, postDeleteUser, postUpdateUser } from "controllers/user.controllers";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardAdmin } from "controllers/admin/dashboard.controllers";
import fileUploadMiddleware from "src/middleware/multer";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.post('/update-user', postUpdateUser);

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
    app.use('/', router);
}
export default webRoutes;