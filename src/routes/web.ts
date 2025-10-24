import express, { Express } from "express";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', (req, res) => {
        res.render('home.ejs');
    })
    app.use('/', router);
}
export default webRoutes;