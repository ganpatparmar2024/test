import express, { NextFunction, Request, Response } from "express";
import { renderTableData } from "../controllers/tableWithOrderByController";
// import { RequestCustom } from "../common";
import paginationMiddleware from "../custom/pagination";
const router=express.Router();


router.get("/", paginationMiddleware(10),renderTableData);

export {router}