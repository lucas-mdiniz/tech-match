import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import mongoose from 'mongoose';

import { schema } from '../../../../schema';

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

it('should not delete a project if user is not authorized', async () => {
  const { ObjectId } = mongoose.Types;
  const projectId = new ObjectId();

  const query = `
    mutation M(
      $id: ID!
    ){
      ProjectDeleteMutation(
        input:{
          id: $id, 
        }
      ){
        error
        success
      }
    }`;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('Project', projectId.toString()),
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectDeleteMutation.error).toBe('User not logged in');
  expect(result.data?.ProjectDeleteMutation.success).toBe(null);
});

it('should not delete any project if project does not exists', async () => {
  const user = await createRows.createUser();

  const { ObjectId } = mongoose.Types;
  const projectId = new ObjectId();

  const query = `
    mutation M(
      $id: ID!
    ){
      ProjectDeleteMutation(
        input:{
          id: $id, 
        }
      ){
        error
        success
      }
    }`;

  const rootValue = {};
  const context = getContext({ user });
  const variables = {
    id: toGlobalId('Project', projectId.toString()),
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectDeleteMutation.error).toBe('Project not found');
  expect(result.data?.ProjectDeleteMutation.success).toBe(null);
});

it('should delete a project if project exists and owner is logged in', async () => {
  const user = await createRows.createUser();
  const project = await createRows.createProject({ owner: user._id });

  const query = `
    mutation M(
      $id: ID!
    ){
      ProjectDeleteMutation(
        input:{
          id: $id, 
        }
      ){
        error
        success
      }
    }`;

  const rootValue = {};
  const context = getContext({ user });
  const variables = {
    id: toGlobalId('Project', project._id.toString()),
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data?.ProjectDeleteMutation.success).toBe('Project deleted');
  expect(result.data?.ProjectDeleteMutation.error).toBe(null);
});
