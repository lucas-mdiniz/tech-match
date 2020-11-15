import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';

import ProjectModel from '../ProjectModel';

export default mutationWithClientMutationId({
  name: 'ProjectDelete',
  inputFields: {
    id:{
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  mutateAndGetPayload: async ({id}, context) => {
    if(!context.user){
      return {
        success: null,
        error: 'User not logged in'
      }
    }

    const mongoId = fromGlobalId(id).id;

    const deletedProject = await ProjectModel.findOneAndDelete({
      _id: mongoId,
      owner: context.user.id
    })

    if(!deletedProject){
      return {
        success: null,
        error: 'Project not found'
      }
    }

    return {
      success: 'Project deleted',
      error: null
    }
  },
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: ({success}) => success
    }, 
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  }
})