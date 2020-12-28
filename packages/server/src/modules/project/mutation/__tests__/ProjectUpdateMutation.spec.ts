import { graphql } from 'graphql';
import mongoose from 'mongoose';
import { toGlobalId } from 'graphql-relay';
import { schema } from '../../../../schema';

import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createRows,
} from '../../../../../test/helper';

beforeAll(connectMongoose);

afterEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should update a project if user is the owner', async () => {
  const user = await createRows.createUser();
  const project = await createRows.createProject({ owner: user._id });

  const query = `mutation M(
    $description: String
    $title: String
    $lookingFor: String
    $id: ID!
  ){
    ProjectUpdateMutation(
      input:{
        description: $description, 
        title: $title, 
        lookingFor: $lookingFor, 
        id: $id
      }) {
        projectEdge{
          node{
              title,
              description,
              lookingFor
          }
        },
        error
      }
  }`;

  const rootValue = {};
  const context = getContext({ user });
  const variables = {
    description: 'this is a changed project',
    id: toGlobalId('Project', project._id),
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectUpdateMutation.projectEdge).not.toBe(null);
  expect(result.data?.ProjectUpdateMutation.error).toBe(null);
});

it('should not update a project if user is not the owner', async () => {
  const user = await createRows.createUser();
  const { ObjectId } = mongoose.Types;
  const projectId = new ObjectId();

  const query = `mutation M(
    $description: String
    $title: String
    $lookingFor: String
    $id: ID!
  ){
    ProjectUpdateMutation(
      input:{
        description: $description, 
        title: $title, 
        lookingFor: $lookingFor, 
        id: $id
      }) {
        projectEdge{
          node{
              title,
              description,
              lookingFor
          }
        },
        error
      }
  }`;

  const rootValue = {};
  const context = getContext({ user });
  const variables = {
    description: 'this is a changed project',
    id: toGlobalId('Project', projectId.toString()),
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectUpdateMutation.projectEdge).toBe(null);
  expect(result.data?.ProjectUpdateMutation.error).toBe('Project not found');
});

it('should not update a project if user is not logged in', async () => {
  const { ObjectId } = mongoose.Types;
  const projectId = new ObjectId();

  const query = `mutation M(
    $description: String
    $title: String
    $lookingFor: String
    $id: ID!
  ){
    ProjectUpdateMutation(
      input:{
        description: $description, 
        title: $title, 
        lookingFor: $lookingFor, 
        id: $id
      }) {
        projectEdge{
          node{
              title,
              description,
              lookingFor
          }
        },
        error
      }
  }`;

  const rootValue = {};
  const context = getContext();
  const variables = {
    description: 'this is a changed project',
    id: toGlobalId('Project', projectId.toString()),
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectUpdateMutation.projectEdge).toBe(null);
  expect(result.data?.ProjectUpdateMutation.error).toBe('User not logged in');
});
