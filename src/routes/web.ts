import express, { Express } from "express";
import { getCreateNewUser, getHomePage, getViewUser, postCreateNewUser, postDeleteUser, postUpdateUser } from "controllers/user.controllers";
import { getAdminCreateUserPage, getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardAdmin } from "controllers/admin/dashboard.controllers";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/create-user', getCreateNewUser);
    router.post('/delete-user/:id', postDeleteUser);
    router.post('/update-user', postUpdateUser);
    router.get('/view-user/:id', getViewUser);

    //admin
    router.get('/admin', getDashBoardAdmin);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getAdminCreateUserPage);
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/product', getAdminProductPage);
    router.post('/admin/create-user', postCreateNewUser);
    app.use('/', router);
}
export default webRoutes;