import express from "express";
const router=express.Router();


router.get("/", (req, res) => {
    res.render("dynamic_table.ejs");
  });

export {router}