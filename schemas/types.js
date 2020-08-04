const graphql = require("graphql");
const { 
  GraphQLObjectType, 
  GraphQLString,  
  GraphQLNonNull, 
  GraphQLInt } = graphql;

const UserType = new GraphQLObjectType(
  {
    name: "User",
    type: "Query",
    fields: {
      id:             { type: GraphQLNonNull(GraphQLInt) },
      userName:       { type: GraphQLString },
      email:          { type: GraphQLString },
      firstName:      { type: GraphQLString },
      lastName:       { type: GraphQLString },
      profilePicPath: { type: GraphQLString }
    }
  })

const PostType = new GraphQLObjectType(
  {
    name: "Post",
    type: "Query",
    fields: {
      id:             { type: GraphQLNonNull(GraphQLInt) },
      userId:         { type: GraphQLInt },
      caption:        { type: GraphQLString },
      photoPath:      { type: GraphQLString },
    }
  })

exports.UserType = UserType;
exports.PostType = PostType;