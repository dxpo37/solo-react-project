const {getPosts, getUser, getLogin} = require("../utils/utils")
const { UserType, PostType, LoginType} = require("./types");
const {  GraphQLSchema,  GraphQLObjectType,  GraphQLString,  GraphQLList,  GraphQLInt,  GraphQLNonNull} = require('graphql')

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {

    login: {
      type: LoginType,
      args: {
        userName: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve:  async (parentValue, args, req) => {       
        console.log(req.user)
        return await getLogin(args.userName,args.password, req.user) 
      }
    },

    user: {
      type: UserType,
      resolve:  async (parentValue, args, req) => {
        return await getUser(req.user.dataValues.id);
      }
    },

    post: {
      type: PostType,
      // args: { id: {type: GraphQLInt }},
      resolve:  async (parentValue, args, req) => {    
        return getPosts(req.user.dataValues.id)
      }
    },
    
  }
})

exports.query = RootQuery