import { Request, Response } from "express";
import {select,insert} from "../Services/registerService"
import { getRandomCode } from "../common";
import { RowDataPacket } from "mysql2";


const register= async (req:Request, res:Response) => {
  // console.log(req.body);
    var username:string = req.body.username[0];
    var name:string = req.body.name[0];
    var lName:string = req.body.lName[0];
  
    // console.log(username, name, lName);
  
    try {
      const result:RowDataPacket = await select("select * from users where email =?", [
        username,
      ]);
      if (result!==null) {
        
          console.log(result);
          if (result.status == 0) {
            var randCodee:string = getRandomCode();
            var id:string = result.id;
            // console.log(randCodee, id);
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
          var randCode:string = getRandomCode();
          var uid = await insert(
            "insert into users (name, lName, email, status,uniquecode) values (?,?,?,?,?)",
            [name, lName, username, "0", randCode]
          );
          res.status(200).send({ randCode, uid });
        }
      
      
    } catch (error) {
      console.log(error);
    }
  }   
  

 

  export {register}
  