import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { select } from "../Services/registerService";
import { Request,Response } from "express";
 interface TypedRequestBody<T> extends Express.Request {
  body: T
}
const login = async (req:TypedRequestBody<{ username: string, password: string }>, res:Response) => {
    try {
    
      const { username, password } = req.body; 
      
      const result = await select("select * from users where email =?", [
        username,
      ]);
      
      
        if (result!==null) {
        
          bcrypt.compare(password, result.password, (err, results) => {
              if (err) {
                console.log("compare error",err);
                return 
              }
              console.log(result);
              var username = result.email
              console.log(username);
              if (results) {
                console.log("verified User");
                var payload = username
                console.log(payload);
                const token = Jwt.sign({payload}, "secret", {
                  expiresIn: "10m",
                });
                res.cookie('jwt',token)
                res.redirect('/api/home')
          
              } else {
                console.log("unverified user");
                return res.status(400).json({ message: "Invalid username or password" });
                
              }
            });
        }
        else{
          return res.status(400).json({ message: "Invalid username or password" });
        }
      
      
  
      
    } catch (error) {
      console.log(error);
    }
  }

export{login}