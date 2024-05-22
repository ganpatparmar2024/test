import express from "express";
import { setPass } from "../controllers/passwordController";
const router=express.Router();


router.post("/", setPass);

export {router}