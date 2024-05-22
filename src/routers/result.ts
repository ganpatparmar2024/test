import express,{NextFunction, Request,Response} from "express";
import  {renderResult}  from "../controllers/resultController";
import { renderReport } from "../controllers/reportController";


interface Page {
  page: string;
}

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
        endIndex
      };
  
      next(); // Call the next middleware
    };
  };

  const router=express.Router();

  router.get("/", paginationMiddleware(10),renderResult);
  router.get("/report",renderReport)
  export{router}
