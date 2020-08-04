// const { db } = require("../pgAdaptor");
const db = require("../db/models")
const { getUserToken, requireAuth } = require("../utils/auth")
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const { UserType, PostType, LoginType} = require("./types");
const { Op } = require('sequelize')

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
      resolve:  async (parentValue, args) => {
        const user = await db.User.findOne({where: {[Op.or]: [{ email: args.userName }, { userName: args.userName }]}})
        if (!user || !user.validatePassword(args.password)) return new Error("incorrect")        
        const token = getUserToken(user);
        const id = user.id
        return {token,id}
      }
    },

    user: {
      type: UserType,
      args: { id: {type: GraphQLInt }},
      resolve:  async (parentValue, args) => {
        console.log(args.id)
        return await db.User.findByPk(args.id, { attributes: ['id', 'firstName', 'lastName', 'userName', 'email', 'bio', 'profilePicPath', 'age', 'gender'] })
      }
    },

    post: {
      type: PostType,
      args: { id: {type: GraphQLInt }},
      resolve:  async (parentValue, args) => {
        return await db.Post.findByPk(args.id, { attributes: ['id', 'userId','caption', 'photoPath'] })
      }
    },    
  }
});

exports.query = RootQuery;