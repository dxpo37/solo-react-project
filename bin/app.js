
const app = require("express")()
const express = require("express")
const cors = require('cors')
const morgan = require("morgan")
const {requireAuth} = require("../utils/auth")
const {CLIENT_URL} = require("../utils/utils")
const path = require('path')

app.use(cors())
const AWS_URL = 'https://pikagram-pics1.s3-us-east-2.amazonaws.com/'
// app.use( cors( { origin: [CLIENT_URL, AWS_URL], credentials: true } ) )

const aws = {
bucketName: process.env.AWS_BUCKET_NAME,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
region: process.env.AWS_REGION }


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get(['/','/home'], (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) })
  app.get("/aws", (req, res) => {res.json({aws})}) //needed to add this route get process.env from backend to frontend-- heroku config vars are not available in react app static build
}

app.use(morgan("dev"))
app.use(requireAuth)

module.exports = app