import express from "express";
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
const router = express.Router();

router.use("/kukuCube", kukuCube);
router.use("/register", register);
router.use("/tiktakToe", tikTakToe);
router.use("/bubbleSort", bubbleSort);
router.use("/tableOfEvents", tableOfEvents);
router.use("/dynamicTable", dynamicTable);
router.use("/thanks", thanks);
router.use("/activeLink", activeLink);
router.use("/password", password)
router.use("/login",login)
export { router };
