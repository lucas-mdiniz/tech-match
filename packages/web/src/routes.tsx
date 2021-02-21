import { loadQuery } from '@workshop/relay';

import { JSResource } from '@workshop/route';

import { Environment } from './relay';

export type Route = {
  component: typeof JSResource;
  path: string;
  exact?: boolean;
  routes: Route[];
  prepare: (params: Object) => Object;
};

export const routes: Route[] = [
  {
    component: JSResource('Root', () => import('./Root')),
    path: '/',
    exact: false,
    routes: [
      {
        path: '/',
        exact: true,
        component: JSResource('UserList', () => import('./UserList'))
      },
      {
        path: '/login',
        exact: true,
        component: JSResource('Login', () => import('./Login'))
      }
    ],
  },
];
