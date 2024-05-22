import express from "express";
import bodyParser from "body-parser";
import {router} from "./routers/routes";
import passport from "passport";
import cookieParser from "cookie-parser";
import { applyPassportStrategy } from "./auth/auth";
import { router as secureRoute } from "./routers/secure-routes";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
app.use(passport.initialize());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname+'/public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);
app.use(cookieParser())
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
applyPassportStrategy(passport);

app.use(
  "/",
  secureRoute
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
