import express from "express";
const router=express.Router();


router.get("/", (req, res) => {
    res.render("tik_tak_toe.ejs");
  });

export {router}