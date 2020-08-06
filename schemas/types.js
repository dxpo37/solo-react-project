const { GraphQLObject,  GraphQLObjectType,  GraphQLString, GraphQLNonNull,   GraphQLInt } =  require("graphql")
const {getUser} = require("../utils/utils")

const LoginType = new GraphQLObjectType(
  {
    name: "Login",
    type: "Query",
    fields: {
      id: {type: GraphQLInt},
      token: { type: GraphQLString },
    }
  })

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

const PostType = new GraphQLObjectType (
  {
    name: "Post",
    type: "Query",
    fields: {
      allPosts: { type: GraphQLString },
    }
  })

const CommentType = new GraphQLObjectType (
  {
    name: "Comment",
    type: "Query",
    fields: {
      id:             { type: GraphQLNonNull(GraphQLInt) },
      postId  :       { type: GraphQLInt },
      comment:        { type: GraphQLString },
      userId  :       { type: GraphQLInt },
    }
  })

exports.UserType = UserType
exports.PostType = PostType
exports.LoginType = LoginType
exports.CommentType = CommentType
