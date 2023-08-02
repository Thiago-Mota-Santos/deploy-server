import { createLoader } from '@entria/graphql-mongo-helpers'

import { UserModel } from './UserModel'
import { registerLoader } from '../Loader/LoaderRegister'

const { Wrapper, getLoader, clearCache, load, loadAll } = createLoader({
  model: UserModel,
  loaderName: 'UserLoader',
})

registerLoader('UserLoader', getLoader)

export const UserLoader = {
  User: Wrapper,
  getLoader,
  clearCache,
  load,
  loadAll,
}