

import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import PojectMutations from '../modules/project/mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...PojectMutations
  }),
});
