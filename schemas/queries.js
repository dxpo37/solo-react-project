const { db } = require("../pgAdaptor");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const { UserType} = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {

    
    user: {
      type: UserType,
      args: { 

        id: {type: GraphQLInt }
      
      },
      resolve: async (parentValue, args) => {
        const query = `SELECT * FROM "Users" WHERE id=$1`;
        const values = [args.id];

        return await db.one(query, values)

      }
    }
  }
});

exports.query = RootQuery;