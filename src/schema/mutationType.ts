import { GraphQLObjectType } from 'graphql'
import * as CreateUser from '../modules/User/mutations/UserCreate'


export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({
    ...CreateUser
  }),
})