import express,{NextFunction, Request,Response} from "express";
import  {renderResult}  from "../controllers/resultController";
import { renderReport } from "../controllers/reportController";
import paginationMiddleware from "../custom/pagination";


  const router=express.Router();

  router.get("/", paginationMiddleware(10),renderResult);
  router.get("/report",renderReport)
  export{router}
