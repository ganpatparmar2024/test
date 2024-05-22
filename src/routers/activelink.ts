import express from "express";
import { getActivelink } from "../controllers/activelinkController";
const router=express.Router();


router.get("/", getActivelink);

export {router}