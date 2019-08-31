import express from "express";
import routes from "../routes";
import {postRegisterView, postAddComment, postdelteComment} from "../controller/videoController";
const apiRouter = express.Router();

apiRouter.post(routes.registerview,postRegisterView);
apiRouter.post(routes.addComment,postAddComment);
apiRouter.delete(routes.addComment,postdelteComment);



export default apiRouter;