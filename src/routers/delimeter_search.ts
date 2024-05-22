import express,{Request,Response} from "express";
import { renderdelimeterSearch } from "../controllers/delimeterSearchController";

const router=express.Router();


router.get("/", (req:Request, res:Response) => {
    res.render("delimeter_search.ejs");
  });
router.post("/submit",renderdelimeterSearch)
export {router}