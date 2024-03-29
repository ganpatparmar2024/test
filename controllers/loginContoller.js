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
            console.log(result);
            var username = result[0].email
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
  
      
    } catch (e) {
      console.log(e.message);
    }
  }

export{login}