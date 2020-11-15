import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import {mutationWithClientMutationId, fromGlobalId, toGlobalId} from 'graphql-relay';

import {ProjectConnection} from '../ProjectType';
import ProjectModel from '../ProjectModel';
import * as ProjectLoader from '../ProjectLoader';

export default mutationWithClientMutationId({
  name: 'ProjectUpdate',
  inputFields: {
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    lookingFor: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLNonNull(GraphQLID)
    }
  },
  mutateAndGetPayload: async (args, context) => {
    if(!context.user){
      return {
        error: 'User not logged in'
      }
    }

    const {title, description, lookingFor, id} = args;
    
    const mongoId = fromGlobalId(id).id;

    //update only if field is not null and is one of description, title or lookingFor
    const allowedUpdates = {title, description, lookingFor};

    (Object.keys(allowedUpdates) as Array<keyof typeof allowedUpdates>).forEach((arg) =>
      !allowedUpdates[arg] && delete allowedUpdates[arg]
    );

    const updatedProject = await ProjectModel.findOneAndUpdate(
      {_id: mongoId, owner: context.user.id}, 
      allowedUpdates, {new: true} 
    )

    if(!updatedProject){
      return {
        error: "Project not found"
      }
    }

    return {
      id: updatedProject._id,
      error: null
    }

  },
  outputFields:{
    projectEdge: {
      type: ProjectConnection.edgeType,
      resolve: async ({id}, _, context) => {
    
        const updatedProject = await ProjectLoader.load(context, id);

        if(!updatedProject){
          return null
        }

        return {
          cursor: toGlobalId('Project', updatedProject.id),
          node: updatedProject,
        }
      }
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  }
})