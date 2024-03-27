import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { select } from "../Services/registerService.js";

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const result = await select("select * from users where email =?", [
        username,
      ]);
    
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, results) => {
            if (err) {
              console.log("compare error",err);
              return 
            }
            if (results) {
              console.log("verified User");
              const token = Jwt.sign(
                { username: user.username },
                'secret',
                {
                  expiresIn: "1h",
                }
              );
          
              res.json({ message: "Logged in successfully", token });
            } else {
              console.log("unverified user");
             
              return
            }
          });
      }
  
      
    } catch (e) {
      console.log(e.message);
    }
  }

export{login}