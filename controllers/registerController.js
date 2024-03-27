import {select,insert} from "../Services/registerService.js"
import { getRandomCode } from "../public/js/common.js";


const register= async (req, res) => {
  console.log(req.body);
    var username = req.body.username[0];
    var name = req.body.name[0];
    var lName = req.body.lName[0];
  
    console.log(username, name, lName);
  
    try {
      const result = await select("select * from users where email =?", [
        username,
      ]);
      if (result.length > 0) {
        console.log(result);
        if (result[0].status == 0) {
          var randCodee = getRandomCode();
          var id = result[0].id;
          console.log(randCodee, id);
          await insert("update users set uniquecode = ? where id = ? ", [
            randCodee,
            id,
          ]);
          console.log("user alredy exist");
          res.status(201).send({ randCodee, id });
        } else {
          console.log("user alredy exist");
          res.status(409).send("User alredy exist");
        }
      } else {
        var randCode = getRandomCode();
        var uid = await insert(
          "insert into users (name, lName, email, status,uniquecode) values (?,?,?,?,?)",
          [name, lName, username, 0, randCode]
        );
        res.status(200).send({ randCode, uid });
      }
    } catch (error) {
      console.log(error);
    }
  }   
  

 

  export {register}
  