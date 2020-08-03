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
      resolve(parentValue, args) {
        const query = `SELECT * FROM "Users" WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.query = RootQuery;