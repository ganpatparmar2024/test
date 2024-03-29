import { Strategy, ExtractJwt } from 'passport-jwt';
import { select } from '../Services/registerService.js';

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  return token;
};


export const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = cookieExtractor;
  
  options.secretOrKey = 'secret'
  passport.use(
    new Strategy(options, async (payload, done) => {
      console.log("iam in stregey");
      console.log(payload.payload);
      const result = await select("select * from users where email =?", [
        payload.payload,
      ]);
      if (result.length>0) {
        return done(null, {
          username: result[0].email,          
        });
      }
      return done(null, false);
      
    })
  );
};
