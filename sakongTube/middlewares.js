import routes from "./routes";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();



const s3 = new aws.S3({
    accessKeyId:process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region:"ap-northeast-2"
})


const multerVideo = multer({
    storage:multerS3({
        s3,
        acl:"public-read",
        bucket: "sakongtube/video"
    })
});
const multerAvatar = multer({
    storage:multerS3({
        s3,
        acl:"public-read",
        bucket: "sakongtube/avatar"
    })
});
// const multerAvatar = multer({dest:"uploads/avatars/"});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single('avatar');


export const localsMiddleware = (req,res,next)=>{
    res.locals.siteName = "SakongTube";
    res.locals.routes = routes;
    //user 데이터 있을땐 저장, 없을땐 빈 객체
    res.locals.loggedUser = req.user || null
    // console.log('req.user(middleware)',req.user);
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
        req.flash("error","로그인 되어있지 않아요.")
        res.redirect(routes.home);
    }else{
        console.log('로그인 되어있음')
        next()
    }
}

