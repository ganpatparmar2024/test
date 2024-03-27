import express from "express";

import { register } from "../controllers/registerController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("register.ejs");
});
router.post("/", register);
export { router };
