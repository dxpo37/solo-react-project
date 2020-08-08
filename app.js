
const app = require("express")()
const express = require("express")
const cors = require('cors')
const morgan = require("morgan")
const {requireAuth} = require("./utils/auth")
const {CLIENT_URL} = require("./utils/utils")
const path = require('path')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get(['/','/home'], (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) })
}

app.use( cors( { origin: CLIENT_URL, credentials: true } ) )
app.use(morgan("dev"));
app.use(requireAuth)

module.exports = app