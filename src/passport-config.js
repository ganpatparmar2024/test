import JwtStrategy from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

const users = require('./routes/auth').users;
 
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};
 
const passport = ()=> {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const user = users.find(u => u.username === jwt_payload.username);
 
      if (user) {
        return done(null, user);
      }
 
      return done(null, false);
    })
  );
};