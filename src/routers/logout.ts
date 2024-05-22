import express,{Request,Response} from "express";

import { logout } from "../controllers/logoutController";
const router = express.Router();


router.post("/", logout);
export { router };