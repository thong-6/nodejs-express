import express, { Express } from "express";
import { getCreateNewUser, getHomePage } from "../controllers/user.controllers";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/create-user', getCreateNewUser)
    app.use('/', router);
}
export default webRoutes;