import routes from "./routes";

export const localsMiddleware = (req,res,next)=>{
    res.locals.siteName = "SakongTube";
    res.locals.routes = routes;
    next();
}