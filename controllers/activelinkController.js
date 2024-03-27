import {select,insert} from "../Services/registerService.js"
import { getRandomCode } from "../public/js/common.js";

const getActivelink = async (req, res) => {
    try {
      var code = req.query.randCode;
      var id = req.query.id;
      const result = await select(
        "select updated_at from users where id = ? and uniquecode =?",
        [id, code]
      );
      var currentTime = new Date().toTimeString();
      var activateTime = new Date(
        new Date(result[0].updated_at).getTime() + 1 * 6000
      ).toTimeString();
      console.log(currentTime, activateTime);
      if (activateTime > currentTime || activateTime == currentTime) {
        await insert("update users set status = ? where id = ?", [1, id]);
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
    } catch (error) {
      console.log("active link error", error);
    }
  }

  export{getActivelink}