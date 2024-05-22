import { Request, Response } from "express";
import {insert} from "../Services/registerService"
import bcrypt from "bcrypt"
const saltRounds = 10
const setPass =   async (req:Request, res:Response) => {
    var id = req.body.id;
    var password = req.body.password[0];
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      var uid = await insert(
        "update users  set password = ?, status = ? where id = ?",
        [hash, 1, id]
      );
      console.log(uid);
      if (uid == 0) {
        console.log(uid);
        res.status(201).send("You are successfully registerd");
      }
    })}
export{setPass}