// import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
// import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'
// import { UserModel } from '../UserModel'
// import { randomUUID } from 'crypto'
// import { UserType } from '../UserType'
// import { successField } from '@entria/graphql-mongo-helpers';

// const UserCreate = mutationWithClientMutationId({
//   name: 'UserRegister',
//   description: 'Register a new user',
//   inputFields: {
//     username: { type: new GraphQLNonNull(GraphQLString) },
//   },

//   mutateAndGetPayload: async ({ username, ...rest }) => {
   
//     const user = await new UserModel({
//       username,
      
//       ...rest,
//     }).save()


//     const token = randomUUID()

//     return {
//       token,
//       id: user._id,
//       success: 'User registered',
//     }
//   },
//   outputFields: {
//     me: {
//       type: UserType,
//       resolve: ({ user }) => user,
//     },
//   },
//   ...successField,
// })

// export { UserCreate }