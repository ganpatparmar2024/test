import express from "express";
import { getActivelink } from "../controllers/activelinkController.js";
const router=express.Router();


router.get("/", getActivelink);

export {router}