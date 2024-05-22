import express,{Request,Response} from "express";

import { login } from "../controllers/loginContoller";
const router = express.Router();

router.get("/", (req:Request, res:Response) => {
  res.render("login.ejs");
});
router.post("/", login);
export { router };