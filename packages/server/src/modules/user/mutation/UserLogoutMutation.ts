import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLString} from 'graphql';

interface ICurrentToken {
  token: string,
  _id: string
}

export default mutationWithClientMutationId({
  name: 'UserLogoutMutation',
  mutateAndGetPayload: async (_, { user, req }) =>{
    if (!user) {
      return { error: 'User not logged in.' };
    }

    const token = req.header.authorization.substring(7);

    try{
      user.tokens = user.tokens.filter((currentToken:ICurrentToken) => {
        return currentToken.token !== token
      });

      await user.save();

      return {
        success: "Logged out"
      }
    } catch {
      return {error: "Something went wrong, try again later"}
    }
  }, 
  inputFields:{},
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ success }) => success,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  }
})