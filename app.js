"use strict";
const graphql = require("graphql");
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();
 
app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, () =>
  console.log(`GraphQL server running on localhost:${port}`)
);