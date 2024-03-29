import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("union_of_all.ejs");
});

export { router };