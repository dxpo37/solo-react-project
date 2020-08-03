const graphql = require("graphql");
const { 
  GraphQLObjectType, 
  GraphQLString,  
  GraphQLNonNull, 
  GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    firstName: {type: GraphQLString}
  }
});

exports.UserType = UserType;
