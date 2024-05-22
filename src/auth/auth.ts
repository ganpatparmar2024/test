import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { select } from "../Services/registerService";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { promises } from "dns";

var cookieExtractor = function (req: Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

type doneFunction = (err: any, user?: Express.User | false | null) => void;

export const applyPassportStrategy: doneFunction = (passport) => {
  const options: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: "secret",
  };

  passport.use(
    new Strategy(options, async (payload, done) => {
      console.log("iam in stregey");
      console.log(payload.payload);
      const result = await select(
        "select * from users where email =?",
        [payload.payload]
      );
      if (result!== null) {
        return done(null, {
          username: result.email,
        });
      }
      return done(null, false);
    })
  );
};
