import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { applyPassportStrategy } from "../auth/auth.js";
import { router as kukuCube } from "./kuKuCubeRouter.js";
import { router as tikTakToe } from "./tik_tak_toe.js";
import { router as bubbleSort } from "./bubble_sort.js";
import { router as tableOfEvents } from "./table_of_events.js";
import { router as dynamicTable } from "./dynamic_table.js";
import { router as register } from "./register.js";
import { router as thanks } from "./thanks.js";
import { router as activeLink } from "./activelink.js";
import { router as password } from "./password.js";
import { router as login} from "./login.js";
import { router as tablewitorderby } from "./table_with_orderby.js";
import { router as attendance } from "./attendance.js";
import { router as result } from "./result.js";
import { router as delimeterSearch } from "./delimeter_search.js";
import { router as jobApplication } from "./job_application.js";
import { router as searchTable } from "./search_table.js";
import { router as home } from "./home.js";
import { router as logout } from "./logout.js";

const router = express.Router();
router.use(passport.initialize());
router.use(cookieParser())
applyPassportStrategy(passport);
router.use("/kukuCube",passport.authenticate("jwt", { session: false }), kukuCube);
router.use("/register", register);
router.use("/tiktakToe",passport.authenticate("jwt", { session: false }), tikTakToe);
router.use("/bubbleSort",passport.authenticate("jwt", { session: false }), bubbleSort);
router.use("/tableOfEvents",passport.authenticate("jwt", { session: false }), tableOfEvents);
router.use("/dynamicTable",passport.authenticate("jwt", { session: false }), dynamicTable);
router.use("/thanks", thanks);
router.use("/activeLink", activeLink);
router.use("/password", password)
router.use("/login",login)
router.use("/tablewitorderby",passport.authenticate("jwt", { session: false }),tablewitorderby)
router.use("/attendance",passport.authenticate("jwt", { session: false }),attendance)
router.use("/result",passport.authenticate("jwt", { session: false }),result)
router.use("/delimetersearch",passport.authenticate("jwt", { session: false }),delimeterSearch)
router.use("/jobapplication",passport.authenticate("jwt", { session: false }),jobApplication)
router.use("/searchtable",passport.authenticate("jwt", { session: false }),searchTable)
router.use("/logout",passport.authenticate("jwt", { session: false }),logout)
router.use("/home",passport.authenticate("jwt", { session: false }),home);
export { router };
