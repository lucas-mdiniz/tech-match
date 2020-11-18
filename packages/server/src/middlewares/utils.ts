import { GraphQLResolveInfo } from 'graphql';

interface GraphQLMutationConfig {
  extensions: object
}

export function getMutationFields(info: GraphQLResolveInfo, mutationName: string): GraphQLMutationConfig | null {
  const mutationType = info.schema.getMutationType();
  if (!mutationType) {
    return null;
  }

  const fields = mutationType.getFields();

  return fields[mutationName];
}