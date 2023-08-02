import { GraphQLFieldConfig, GraphQLObjectType } from "graphql"
import { UserLoader } from "../modules/User/UserLoader"
import { UserType } from "../modules/User/UserType"
import { nodeField, nodesField } from "../node/typeRegister"

const me: GraphQLFieldConfig<any, any, any> = {
    type: UserType,
    description: 'user logged',
    resolve: async (_root, _args, context) =>
      await UserLoader.loadAll(context, context.user?._id),
  }
  
  export const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'root of all queries',
    fields: () => ({
      node: nodeField,
      nodes: nodesField,
      
      me,
    }),
  })