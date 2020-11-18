import { getMutationFields } from './utils';

export default async function authenticatedOnlyMutation(
  resolve, root, args, context, info
) {
  const mutationFields = getMutationFields(info, info.fieldName);

  if (!mutationFields) {
    return;
  }

  if(!mutationFields.extensions){
    return await resolve(root, args, context, info);
  }

  const {authenticatedOnly} = mutationFields?.extensions;

  if(authenticatedOnly){
    if(!context.user){
      return {
        error: 'User not logged in'
      }
    }

    return await resolve(root, args, context, info);
  }

  return await resolve(root, args, context, info);
}