import { graphql } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { schema } from '../../../../schema';
import ProjectModel from '../../ProjectModel';

import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createRows,
} from '../../../../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should not create a project if user is not logged in', async () => {
  const query = `
    mutation M(
      $title: String!
      $description: String!
      $lookingFor: String
    ) {
      ProjectAddMutation(input: {
        title: $title
        description: $description
        lookingFor: $lookingFor
      }){
        error
        projectEdge{
            node{
                title
                lookingFor
                description
            }
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    title: 'test',
    description: 'testing project',
    lookingFor: 'developer',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectAddMutation.error).toBe('User not logged in');
  expect(result.data?.ProjectAddMutation.projectEdge).toBe(null);
});

it('should create a project if user is logged in and parameters are valid', async () => {
  const user = await createRows.createUser();

  const query = `
    mutation M(
      $title: String!
      $description: String!
      $lookingFor: String
    ) {
      ProjectAddMutation(input: {
        title: $title
        description: $description
        lookingFor: $lookingFor
      }){
        error
        projectEdge{
            node{
                id
                title
                lookingFor
                description
            }
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext({ user });
  const variables = {
    title: 'test',
    description: 'testing project',
    lookingFor: 'developer',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectAddMutation.error).toBe(null);
  expect(result.data?.ProjectAddMutation.projectEdge).not.toBe(null);

  const projectId = fromGlobalId(result.data?.ProjectAddMutation.projectEdge.node.id);

  const project = await ProjectModel.findById(projectId.id);

  expect(project).not.toBe(null);
});
