import { Maybe } from 'graphql/jsutils/Maybe';
import { ParameterizedContext } from 'koa';
import { UserDocument } from './modules/User/UserModel';
import { GraphQLContext } from './graphql/context';
import { getDataLoaders } from './modules/Loader/LoaderRegister';

type ContextVars = {
  ctx: ParameterizedContext;
  user: Maybe<UserDocument>;
};

export const getContext = async ({ ctx, user }: ContextVars): Promise<GraphQLContext> => {
  const dataloaders = getDataLoaders();

  return {
    ctx,
    dataloaders,
    user,
  } as const;
};