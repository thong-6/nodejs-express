import express, { Express } from "express";
import { getCreateNewUser, getHomePage, postCreateNewUser } from "controllers/user.controllers";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/create-user', getCreateNewUser);
    router.post('/create-user', postCreateNewUser);
    app.use('/', router);
}
export default webRoutes;