import express,{Request,Response} from "express";
import { submitData,getData,renderUpdate,updateData,thanks,listOfEmployees } from "../controllers/jobApplicationController";

const router = express.Router();

router.get("/", (req:Request, res:Response) => {
  res.render("job_Application_Form.ejs");
});
router.post("/submit", submitData);
router.get("/getdata",getData)
router.get("/listofemployees",listOfEmployees)
router.get("/update",renderUpdate)
router.post("/updatedata",updateData)
router.get("/thanks",thanks)

export { router };
