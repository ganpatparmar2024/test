import express from "express";

import { login } from "../controllers/loginContoller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login.ejs");
});
router.post("/", login);
export { router };