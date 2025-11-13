import express from "express";
import 'dotenv/config'
import webRoutes from "./routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassport from "./middleware/passport.local";
import session from "express-session";

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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassport()
// config web routes
webRoutes(app);
initDatabase();
app.use((req, res) => {
    res.send("404 Not Found")
})
app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);

})