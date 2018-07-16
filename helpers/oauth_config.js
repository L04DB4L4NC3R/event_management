const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const {hashSync}=require('bcrypt');
require('dotenv').config();
const util=require('util');


passport.serializeUser((user,done)=>{
  done(null,user);
});
passport.deserializeUser((user,done)=>{
  done(null,user);
});


//main passport function
passport.use(
  new GoogleStrategy({
  clientID:process.env.client_ID,
  clientSecret:process.env.client_secret,
  callbackURL:"/user/google/callback"
},async (accessToken,refreshToken,profile,done)=>{
    //hashing the google id
    console.log(profile.emails[0].value);
    let hash=hashSync(profile.id,10);
    done(null,{name:profile.emails[0].value,passwd:hash});
}));

passport.use(
new FacebookStrategy({
  clientID:process.env.APP_ID,
  clientSecret:process.env.APP_SECRET,
  callbackURL:"/user/facebook/callback",
  profileFields: ['id', 'displayName','email']
},(accessToken,refreshToken,profile,done)=>{
  
  let hash=hashSync(profile.id,10);
  console.log(hash);
  done(null,{name:profile.displayName,passwd:hash});


})
  
)