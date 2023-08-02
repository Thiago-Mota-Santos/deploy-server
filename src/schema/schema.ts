import {  GraphQLSchema } from "graphql";
import { QueryType } from "./queryType";
import { MutationType } from "./mutationType";

const schema = new GraphQLSchema({
    mutation: MutationType,
    query: QueryType
})

export { schema }