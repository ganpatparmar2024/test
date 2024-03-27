import express from "express";
const router=express.Router();


router.get("/", (req, res) => {
    res.render("table_of_events.ejs");
  });

export {router}