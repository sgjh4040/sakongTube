import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest:"uploads/videos/"});

export const localsMiddleware = (req,res,next)=>{
    res.locals.siteName = "SakongTube";
    res.locals.routes = routes;
    //user 데이터 있을땐 저장, 없을땐 빈 객체
    res.locals.loggedUser = req.user || null
    console.log(req.user);
    next();
}

//로그인 되어있는지 확인.로그인이 안되어있을떄만 넘어갈수 있는 미들웨어
export const onlyPublic = (req,res,next)=>{
    if(req.user){
        res.redirect(routes.home);
    }else{
        next()
    }
}
//로그인 안되어있는지 확인. 로그인이되어있을때만 넘어갈수 있는 미들웨어
export const onlyPrivate = (req,res,next)=>{
    if(!req.user){
        res.redirect(routes.home);
    }else{
        next()
    }
}

export const uploadVideo = multerVideo.single('videoFile');