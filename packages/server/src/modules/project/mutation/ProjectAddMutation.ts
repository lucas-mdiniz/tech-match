import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import {GraphQLNonNull, GraphQLString} from 'graphql';

import {ProjectConnection} from '../ProjectType';
import ProjectModel from '../ProjectModel';
import * as ProjectLoader from '../ProjectLoader';

const mutation = mutationWithClientMutationId({
  name: "ProjectAdd",
  inputFields: {
    title:{
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lookingFor: {
      type: GraphQLString
    }
  }, 
  mutateAndGetPayload: async ({title, description, lookingFor}, context) => {
    
    const owner = context.user._id;

    const newProject = await new ProjectModel({
      title,
      description,
      lookingFor,
      owner
    }).save();

    return {
      id: newProject._id,
      error: null
    }

  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    },
    projectEdge: {
      type: ProjectConnection.edgeType,
      resolve: async ({id}, _, context) => {
        
        const newProject = await ProjectLoader.load(context, id);

        if(!newProject){
          return null;
        }

        return {
          cursor: toGlobalId('Project', newProject.id),
          node: newProject
        }
      }
    }
  }
});

export default {
  ...mutation,
  extensions: {
    ...mutation.extensions,
    authenticatedOnly: true,
  },
};