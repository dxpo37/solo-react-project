"use strict";
const graphql = require("graphql");
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");

const app = express();
const cors = require('cors')
app.use(cors({origin:true}))

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