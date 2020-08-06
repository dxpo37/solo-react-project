const graphql = require("graphql")
const { GraphQLSchema } = graphql
const app = require("express")()
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const morgan = require("morgan")

const { query } = require("./schemas/queries")
const { mutation } = require("./schemas/mutations")
const {requireAuth} = require("./utils/auth")

app.use(cors({origin:true}))
app.use(morgan("dev"));

const schema = new GraphQLSchema({query,mutation});

app.use(requireAuth)
app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

module.exports = app




