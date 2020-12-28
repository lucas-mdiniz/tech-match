import { GraphQLResolveInfo } from 'graphql';
import { getExtensions } from './utils';
import { GraphQLContext, Resolve } from '../TypeDefinition';

export default async function authenticatedOnlyMutation<TSource, TArgs = { [key: string]: any }>(
  resolve: Resolve,
  root: TSource,
  args: TArgs,
  context: GraphQLContext,
  info: GraphQLResolveInfo,
) {
  const extensions = getExtensions(info, info.fieldName);

  if (!extensions) {
    return await resolve(root, args, context, info);
  }

  const { authenticatedOnly } = extensions;

  if (authenticatedOnly) {
    if (!context.user) {
      return {
        error: 'User not logged in',
      };
    }

    return await resolve(root, args, context, info);
  }

  return await resolve(root, args, context, info);
}