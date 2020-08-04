"use strict";
const graphql = require("graphql");
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");
const { environment } = require("./config");
const app = express();

const schema = new GraphQLSchema({
  query,
  mutation
});

 
app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);


module.exports = app