import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {globalIdField} from 'graphql-relay';

import {nodeInterface} from '../../interface/NodeInterface';
import { connectionDefinitions } from '../../core/connection/CustomConnectionType';


const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: globalIdField('Project'),
    title: {
      type: GraphQLNonNull(GraphQLString), 
    },
    description: {
      type: GraphQLNonNull(GraphQLString)
    },
    lookingFor: {
      type: GraphQLNonNull(GraphQLString)
    }
  }),
  interfaces: () => [nodeInterface],
});

export default ProjectType;

export const ProjectConnection = connectionDefinitions({
  name: 'Project',
  nodeType: GraphQLNonNull(ProjectType),
});
