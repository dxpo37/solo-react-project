
const app = require("express")()
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const morgan = require("morgan")


const {requireAuth} = require("./utils/auth")

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use(morgan("dev"));
app.use(requireAuth)


module.exports = app




