import express, { Request, Response } from "express";
const router=express.Router();


router.get("/", (req:Request, res:Response) => {
    res.render("table_of_events.ejs");
  });

export {router}