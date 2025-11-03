import express, { Express } from "express";
import { getCreateNewUser, getHomePage, getViewUser, postCreateNewUser, postDeleteUser, postUpdateUser } from "controllers/user.controllers";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/create-user', getCreateNewUser);
    router.post('/create-user', postCreateNewUser);
    router.post('/delete-user/:id', postDeleteUser);
    router.post('/update-user', postUpdateUser);
    router.get('/view-user/:id', getViewUser);
    app.use('/', router);
}
export default webRoutes;