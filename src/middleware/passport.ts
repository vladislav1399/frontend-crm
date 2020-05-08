const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'dev-jwt'
};

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(options, async (payload: any, done: any) => {
            try {
                const user = await User.findById(payload.userId).select('phone id');
                if(user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            }catch (e) {
            }
        })
    )
};
