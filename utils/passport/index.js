const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const chalk = require("chalk")
const googleCredentials = {  clientID: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, callbackURL: '/auth/google/callback'}

passport.serializeUser((user, cb) => { cb(null, user) })
passport.deserializeUser((user, cb) => { cb(null, user) })
const googleStrategy = new GoogleStrategy(googleCredentials,

(accessToken, refreshToken, profile, done) => {
  // console.log(chalk.red("accessToken------->",JSON.stringify(profile)))
  // console.log(chalk.red("accessToken------->", accessToken))
  // console.log(chalk.green("refreshToken------->", refreshToken))
  // console.log(chalk.blue("firstName------->", profile.firstName))
  // console.log(chalk.blue("lastName------->", profile.lastName))
  // console.log(chalk.blue("email------->", profile.id))

  done(null, profile)




  // User.findOne({googleId: profile.id}).then((currentUser)=>{
  //   if(currentUser){
  //     //if we already have a record with the given profile ID
  //     done(null, currentUser);
  //   } else{
  //        //if not, create a new user 
  //       new User({
  //         googleId: profile.id,
  //       }).save().then((newUser) =>{
  //         done(null, newUser);
  //       });




})



passport.use('google-login', googleStrategy)

module.exports = passport