import { Request, Response, NextFunction } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return res.redirect('/');
    // if they aren't redirect them to the home page
    next();
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/admin')) {
        const user = req.user;
        if (user?.role?.name === "ADMIN") {
            next();

        }
        else return res.render('status/403.ejs');
        return;
    }
    next();

}



export {
    isLogin, isAdmin
}