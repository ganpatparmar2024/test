import express, { Request, Response, NextFunction } from "express";
// import { RequestCustom } from "RequestCustom";
import { renderAttendce } from "../controllers/attndanceController";
// import  paginationMiddleware  from "../custom/pagination";
import paginationMiddleware from "../custom/pagination";

const router = express.Router();

router.get("/", paginationMiddleware(10), renderAttendce);
export { router };
