import { GraphQLSchema } from 'graphql';

import QueryType from './type/QueryType';
import MutationType from './type/MutationType';
import SubscriptionType from './type/SubscriptionType';

import applyMiddlewares from './middlewares/applyMiddlewares';

const _schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});

applyMiddlewares(_schema);

export const schema = _schema;