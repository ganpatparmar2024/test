import { Request, Response } from "express";
import {select,insert} from "../Services/registerService"
import { getRandomCode } from "../common"
import { RowDataPacket } from "mysql2";
import { Page } from "../custom/custom";


const getActivelink = async (req:Request<{},{},{},Page>, res:Response):Promise<void> => {
    try {
      var code:string = req.query.randCode;
      var id:string = req.query.id;
      const result:RowDataPacket = await select(
        "select updated_at from users where id = ? and uniquecode =?",
        [id, code]
      );
      var currentTime:string = new Date().toTimeString();
      var activateTime:string;
      if (result!==null) {
         activateTime = new Date(
          new Date(result.updated_at).getTime() + 1 * 6000
        ).toTimeString();
        if (activateTime > currentTime || activateTime == currentTime) {
          await insert("update users set status = ? where id = ?", ["1", id]);
          res.render("createpass.ejs");
        } else {
          const randoCode:string = getRandomCode();
          await insert("update users set uniquecode = ? where id = ? ", [
            randoCode,
            id,
          ]);
          res.render("thanks.ejs", {
            randoCode: randoCode,
            id: id,
            invaid: "invalid",
          });
        }
      }
      
      console.log(currentTime, activateTime);
      
    } catch (error) {
      console.log("active link error", error);
    }
  }

  export{getActivelink}