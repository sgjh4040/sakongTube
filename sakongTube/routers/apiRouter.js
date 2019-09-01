import express from "express";
import routes from "../routes";
import {postRegisterView, postAddComment, postdelteComment, postEditComment} from "../controller/videoController";
const apiRouter = express.Router();

apiRouter.post(routes.registerview,postRegisterView);
apiRouter.post(routes.addComment,postAddComment);
apiRouter.delete(routes.addComment,postdelteComment);
apiRouter.patch(routes.addComment,postEditComment)



export default apiRouter;