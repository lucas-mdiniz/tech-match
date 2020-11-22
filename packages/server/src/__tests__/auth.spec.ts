import mongoose from 'mongoose';
import { getUser, generateToken } from '../auth';
import { connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows } from '../../test/helper';
import { jwtSecret } from '../config';
import jwt from 'jsonwebtoken';


const { ObjectId } = mongoose.Types;

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('getUser', () => {
  it('should return an user null when token is null', async () => {
    const token = null;
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token is invalid', async () => {
    const token = 'invalid token';
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token do not represent a valid user', async () => {
    const token = jwt.sign({ id: new ObjectId()}, jwtSecret);

    const { user } = await getUser(`Bearer ${token}`);

    expect(user).toBe(null);
  });

  it('should return user from a valid token', async () => {
    const me = await createRows.createUser();

    const token = await generateToken(me);

    const { user } = await getUser(`Bearer ${token}`);

    expect(user?.name).toBe(me.name);
    expect(user?.email).toBe(me.email);
  });
});
