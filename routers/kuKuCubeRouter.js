import express from "express";
const router=express.Router();


router.get("/", (req, res) => {
    res.render("kukucube.ejs");
  });

export {router}