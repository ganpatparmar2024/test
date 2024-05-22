import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { applyPassportStrategy } from "../auth/auth";
import { router as kukuCube } from "./kuKuCubeRouter";
import { router as tikTakToe } from "./tik_tak_toe";
import { router as bubbleSort } from "./bubble_sort";
import { router as tableOfEvents } from "./table_of_events";
import { router as dynamicTable } from "./dynamic_table";
import { router as register } from "./register";
import { router as thanks } from "./thanks";
import { router as activeLink } from "./activelink";
import { router as password } from "./password";
import { router as login} from "./login";
import { router as tablewitorderby } from "./table_with_orderby";
import { router as attendance } from "./attendance";
import { router as result } from "./result";
import { router as delimeterSearch } from "./delimeter_search";
import { router as jobApplication } from "./job_application";
import { router as searchTable } from "./search_table";
import { router as home } from "./home";
import { router as logout } from "./logout";

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
