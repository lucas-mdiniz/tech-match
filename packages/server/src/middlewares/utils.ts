import { GraphQLResolveInfo } from 'graphql';

interface GraphQLMutationConfig {
  [key: string]: any;
  authenticatedOnly?: boolean
}

export function getExtensions(info: GraphQLResolveInfo, mutationName: string): GraphQLMutationConfig | null {
  const mutationType = info.schema.getMutationType();
  if (!mutationType) {
    return null;
  }

  const fields = mutationType.getFields();

  const {extensions} = fields[mutationName];
  
  if (!extensions){
    return null;
  }

  return extensions;
}