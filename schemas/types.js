const graphql = require("graphql");
const db = require("../db/models")
const { 
  GraphQLObjectType, 
  GraphQLString,  
  GraphQLNonNull, 
  GraphQLInt } = graphql;

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

const PostType = new GraphQLObjectType(
  {
    name: "Post",
    type: "Query",
    fields: {
      id:             { type: GraphQLNonNull(GraphQLInt) },
      caption:        { type: GraphQLString },
      photoPath:      { type: GraphQLString },
      userId: { 
        type: UserType,
        resolve: async (user) => {
          return db.User.findByPk(user.id, { attributes: ['id', 'firstName', 'lastName', 'userName', 'email', 'bio', 'profilePicPath', 'age', 'gender'] })
        }
      },
    }
  })

exports.UserType = UserType;
exports.PostType = PostType;
exports.LoginType = LoginType;