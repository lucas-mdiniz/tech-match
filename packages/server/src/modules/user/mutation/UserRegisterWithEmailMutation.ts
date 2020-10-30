
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { generateToken } from '../../../auth';
import pubSub, { EVENTS } from '../../../pubSub';

import UserModel from '../UserModel';

export default mutationWithClientMutationId({
  name: 'UserRegisterWithEmail',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  mutateAndGetPayload: async ({ name, email, password, role }) => {
    let user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      return {
        error: 'Email already in use',
      };
    }

    const validateRole = ['designer', 'developer'].includes(role.toLowerCase().trim())
    
    if(!validateRole){
      return {
        error: 'Role must be a designer or a developer'
      }
    }

    user = new UserModel({
      name,
      email,
      password,
      role
    });

    await user.save();

    await pubSub.publish(EVENTS.USER.ADDED, { UserAdded: { user } });

    return {
      token: generateToken(user),
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
