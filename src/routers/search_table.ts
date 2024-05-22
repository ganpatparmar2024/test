import express, { NextFunction, Request, Response } from "express";
import { getSubmit,postsubmit } from "../controllers/searchTableController";

interface Page {
  page: string;
}

const router=express.Router();
const paginationMiddleware = (pageSize:number) => {
    return (req:Request<{},{},{},Page>, res:Response, next:NextFunction) => {
      const pageNumber = parseInt(req.query.page) || 1; // Get the current page number from the query parameters
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      // Attach pagination data to the request object
      req.Pagination = {
        page: pageNumber,
        limit: pageSize,
        startIndex,
        endIndex,
      };
  
      next(); // Call the next middleware
    };
  };

router.get("/", (req:Request, res:Response) => {
    res.render("search_table.ejs");
  });
router.post("/submit",paginationMiddleware(10),postsubmit)
router.get("/submit",paginationMiddleware(10),getSubmit)
export {router}