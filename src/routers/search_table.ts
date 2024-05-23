import express, { NextFunction, Request, Response } from "express";
import { getSubmit,postsubmit } from "../controllers/searchTableController";
import paginationMiddleware from "../custom/pagination";

const router=express.Router();

router.get("/", (req:Request, res:Response) => {
    res.render("search_table.ejs");
  });
router.post("/submit",paginationMiddleware(10),postsubmit)
router.get("/submit",paginationMiddleware(10),getSubmit)
export {router}