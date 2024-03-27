import express from "express";
import { setPass } from "../controllers/passwordController.js";
const router=express.Router();


router.post("/", setPass);

export {router}