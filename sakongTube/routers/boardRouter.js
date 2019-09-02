import express from "express";
import routes from "../routes";
import { getBoard, getWrite, postWrite } from "../controller/boardController";

const boardRouter = express.Router();

//게시판 쓰기 페이지
boardRouter.get(routes.write,getWrite);
//게시판 페이지
boardRouter.get(routes.board(),getBoard);
//게시판 글 작성
boardRouter.post(routes.write,postWrite);

export default boardRouter;