
const app = require("express")()
const express = require("express")
const cors = require('cors')
const morgan = require("morgan")
const {requireAuth, restoreOAuthUser} = require("../utils/auth")
const {CLIENT_URL, AWS_URL} = require("../utils/utils")
const path = require('path')
const passport = require('../utils/passport/index')
const cookieSession = require("cookie-session")
const passportCookiesConfig = require('../config/index').passportCookiesConfig
const aws = {bucketName: process.env.AWS_BUCKET_NAME,secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,accessKeyId: process.env.AWS_ACCESS_KEY_ID,region: process.env.AWS_REGION }

// app.use( cors( { origin: [CLIENT_URL, AWS_URL], credentials: true } ) )
app.use( cors( { origin: "*", credentials: true } ) )
app.use(cookieSession({ maxAge: passportCookiesConfig.expiresIn, keys:[passportCookiesConfig.secret]}))
app.use(requireAuth)
app.use(morgan("dev"))
app.use(passport.initialize());
app.use(passport.session())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get(['/','/home'], (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) })
  app.get("/aws", (req, res) => {res.json({aws})}) //needed to add this route to get process.env from backend to frontend-- heroku config vars are not available in react app static build as it runs in browser env not the backend node env
}

const params = {  scope: ["profile", "email"] }
app.get("/auth/google", passport.authenticate("google-login", params))
app.get("/auth/google/callback",  restoreOAuthUser)

module.exports = app