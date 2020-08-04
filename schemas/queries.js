// const { db } = require("../pgAdaptor");
const db = require("../db/models")
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const { UserType, PostType} = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
   
    user: {
      type: UserType,
      args: { id: {type: GraphQLInt }},
      resolve:  async (parentValue, args) => {
        return await db.User.findByPk(args.id, { attributes: ['id', 'firstName', 'lastName', 'userName', 'email', 'bio', 'profilePicPath', 'age', 'gender'] })
      }
    },

    post: {
      type: PostType,
      args: { id: {type: GraphQLInt }},
      resolve:  async (parentValue, args) => {
        return await db.Post.findByPk(args.id, { attributes: ['id', 'userId','caption', 'photoPath'] })
      }
    }
    
  }
});

exports.query = RootQuery;