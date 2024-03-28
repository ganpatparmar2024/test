import express from "express";
import bodyParser from "body-parser";
import { router } from "./routers/routes.js";
import passport from "passport";
import { applyPassportStrategy } from "./auth/auth.js";
import { router as secureRoute } from "./routers/secure-routes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(passport.initialize());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);

applyPassportStrategy(passport);

app.use(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  secureRoute
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
