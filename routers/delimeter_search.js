import express from "express";
import { renderdelimeterSearch } from "../controllers/delimeterSearchController.js";

const router=express.Router();


router.get("/", (req, res) => {
    res.render("delimeter_search.ejs");
  });
router.post("/submit",renderdelimeterSearch)
export {router}