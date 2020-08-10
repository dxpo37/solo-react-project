const db = require("../db/models")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt } = require("graphql")
const { UserType, CommentType, PostType } = require("./types")
const {getPosts, getUser, getLogin, addComment, makePost} = require("../utils/utils")

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {    
    addUser: {
      type: UserType,
      args: {
        id:             { type: GraphQLID },
        userName:       { type: GraphQLString },
        email:          { type: GraphQLString },
        firstName:      { type: GraphQLString },
        lastName:       { type: GraphQLString },
        hashedPassword: { type:GraphQLString  }
      },

      resolve: async (args) => {
        return await db.User.create({
          userName : args.userName,
          email : args.email,
          firstName : args.firstName,
          lastName : args.lastName,
          hashedPassword: args.hashedPassword,
        })
      }
    },

    addComment: {
      type: CommentType,
      args: {
        postId: {type: GraphQLInt},
        comment: { type: GraphQLString},
      },
      resolve:  async (parentValue, args, req) => {       
        return await addComment(req.user.dataValues.id,args.postId,args.comment) 
      }
    },

    makePost: {
      type: PostType,
      args: {
        userId: {type: GraphQLInt},
        caption: { type: GraphQLString},
        photoPath: { type: GraphQLString},
      },
      resolve:  async (parentValue, args, req) => {   
        console.log("------>", req.user.dataValues.id)    
        return await makePost(req.user.dataValues.id,args.caption,args.photoPath) 
      }
    }
}
})

exports.mutation = RootMutation