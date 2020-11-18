import { applyMiddleware } from 'graphql-middleware';

import { GraphQLSchema } from 'graphql';

import authenticatedOnlyMutation from './authenticatedOnlyMutation';

export default function applyMiddlewares(schema: GraphQLSchema) {
  
  const middleware = {
    Mutation: authenticatedOnlyMutation
  }

  applyMiddleware(schema, middleware);
} 