/* eslint-disable no-multi-assign,prefer-const */

import { User, Project } from '../src/model';

export const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

export const createUser = async (payload = {}) => {
  const n = (global.__COUNTERS__.user += 1);

  return new User({
    name: `Normal user ${n}`,
    email: `user-${n}@example.com`,
    password: '123456',
    active: true,
    role: 'developer',
    tokens: [],
    ...payload,
  }).save();
};

export const createProject = async (payload = {}) => {
  const n = (global.__COUNTERS__.project += 1);

  return new Project({
    title: `New Project ${n}`,
    description: `project ${n} description`,
    lookingFor: 'developer',
    ...payload,
  }).save();
};
