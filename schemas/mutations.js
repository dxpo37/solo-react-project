const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { UserType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addProject: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO users("id", "userName", email) VALUES ($1, $2, $3) RETURNING id`;
        const values = [
          args.id,
          args.userName,
          args.email
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;