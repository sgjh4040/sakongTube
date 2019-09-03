import express from "express";
import routes from "../routes";
import { getBoard, getWrite, postWrite, boardDetail, boardDelete } from "../controller/boardController";
import { onlyPrivate } from "../middlewares";

const boardRouter = express.Router();

//게시판 쓰기 페이지
boardRouter.get(routes.write,onlyPrivate,getWrite);
//게시판 페이지
boardRouter.get(routes.board(),getBoard);
//게시판 글 작성
boardRouter.post(routes.write,onlyPrivate,postWrite);
//게시판 상세 정보
boardRouter.get(routes.boardDetail(),boardDetail);
//게시판 글 삭제
boardRouter.get(routes.deleteBoard(),onlyPrivate,boardDelete);

export default boardRouter;