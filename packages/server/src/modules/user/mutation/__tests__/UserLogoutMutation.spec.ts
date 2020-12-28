import { graphql } from 'graphql';
import { schema } from '../../../../schema';

import {
  getContext,
  connectMongoose,
  disconnectMongoose,
  clearDbAndRestartCounters,
  createRows,
} from '../../../../../test/helper';

import { generateToken } from '../../../../auth';

beforeAll(connectMongoose);

afterEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should logout if user is logged in', async () => {
  const user = await createRows.createUser();

  const token = await generateToken(user);

  const query = `mutation {
    UserLogout(input: {}){
      message
      error
    }
  }`;

  const rootValue = {};
  const context = getContext({ user });

  context.req = {
    header: {
      authorization: `Bearer ${token}`,
    },
  };

  const result = await graphql(schema, query, rootValue, context);

  expect(result.data?.UserLogout.message).toBe('Logged out');
  expect(result.data?.UserLogout.error).toBe(null);
});

it('should return error if user is not logged in', async () => {
  const query = `mutation {
    UserLogout(input: {}){
      message
      error
    }
  }`;

  const rootValue = {};
  const context = getContext();

  const result = await graphql(schema, query, rootValue, context);

  expect(result.data?.UserLogout.message).toBe(null);
  expect(result.data?.UserLogout.error).toBe('User not logged in.');
});
