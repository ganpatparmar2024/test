import { Request, Response } from "express";
import {select,insert} from "../Services/registerService"
import { getRandomCode } from "../common"

interface Page {
  randCode: string;
  id:string;
}

const getActivelink = async (req:Request<{},{},{},Page>, res:Response) => {
    try {
      var code = req.query.randCode;
      var id = req.query.id;
      const result = await select(
        "select updated_at from users where id = ? and uniquecode =?",
        [id, code]
      );
      var currentTime = new Date().toTimeString();
      var activateTime;
      if (result!==null) {
         activateTime = new Date(
          new Date(result.updated_at).getTime() + 1 * 6000
        ).toTimeString();
        if (activateTime > currentTime || activateTime == currentTime) {
          await insert("update users set status = ? where id = ?", ["1", id]);
          res.render("createpass.ejs");
        } else {
          const randoCode = getRandomCode();
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