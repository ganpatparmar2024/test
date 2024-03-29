import express from "express";
import { getSubmit,postsubmit } from "../controllers/searchTableController.js";

const router=express.Router();
const paginationMiddleware = (pageSize) => {
    return (req, res, next) => {
      const pageNumber = parseInt(req.query.page) || 1; // Get the current page number from the query parameters
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      // Attach pagination data to the request object
      req.pagination = {
        page: pageNumber,
        limit: pageSize,
        startIndex,
        endIndex,
      };
  
      next(); // Call the next middleware
    };
  };

router.get("/", (req, res) => {
    res.render("search_table.ejs");
  });
router.post("/submit",paginationMiddleware(10),postsubmit)
router.get("/submit",paginationMiddleware(10),getSubmit)
export {router}