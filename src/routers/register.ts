import express,{Request,Response} from "express";

import { register } from "../controllers/registerController";
const router = express.Router();

router.get("/", (req:Request, res:Response) => {
  res.render("register.ejs");
});
router.post("/", register);
export { router };
