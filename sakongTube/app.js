import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter"
import globalRouter from "./routers/globalRouter";
import mongoose from "mongoose";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./passport";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const CokieStore = MongoStore(session);

//보안을 위해 helmet 미들웨어 사용
app.use(helmet());
//사용 앤진 pug 사용
app.set('view engine', 'pug');
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("static"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
//request 확인
app.use(morgan("dev"));
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized: false,
    store:new CokieStore({mongooseConnection:mongoose.connection}),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);



//라우터
app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);

export default app;