import { ParameterizedContext } from 'koa'
import { UserDocument } from '../modules/User/UserModel'
import { DataLoaders } from '../modules/Loader/LoaderRegister'
import { Maybe } from 'graphql/jsutils/Maybe'

export interface GraphQLContext {
  ctx?: ParameterizedContext
  user?: Maybe<UserDocument>
  dataloaders: DataLoaders
}