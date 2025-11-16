/// <reference path="./types/index.d.ts" />
import express from "express";
import 'dotenv/config'
import webRoutes from "./routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassport from "./middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 8080;
// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static files
app.use(express.static('public'))
//config session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))
//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassport()
//middleware
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

// config web routes
webRoutes(app);
initDatabase();
app.use((req, res) => {
    res.render('status/404.ejs')
})
app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);

})