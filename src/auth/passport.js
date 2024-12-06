const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../database/models/User');
const {CLIENTID, CLIENTSECRET} = require('../config')

passport.serializeUser((user , done) => { 
	done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
	done(null, user); 
}); 

passport.use(
    new GoogleStrategy({ 
	clientID: CLIENTID, // Your Credentials here. 
	clientSecret: CLIENTSECRET, // Your Credentials here. 
	callbackURL:"http://localhost:8000/auth/google/callback", 
	passReqToCallback:true
}, 
async function(request, accessToken, refreshToken, profile, done) { 
            try {
                console.log(profile)
                const existingUser = await UserModel.findOne({ email: profile.emails[0].value });
                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new UserModel({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    myRecipes: [],
                    likedRecipes: [],
                    savedRecipes: [],
                });
                await newUser.save();
                return done(null, newUser);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);