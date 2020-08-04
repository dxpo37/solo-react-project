const graphql = require("graphql")
const db = require("../db/models")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql
const { UserType } = require("./types")

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
  }
}
})

exports.mutation = RootMutation