import { loadQuery } from 'react-relay/hooks';
import { Environment } from './relay';

import { JSResource } from '@workshop/route';

export type Route = {
  component: typeof JSResource;
  path: string;
  exact?: boolean;
  routes?: Route[];
  prepare?: (params: Object) => Object;
};

export const routes: Route[] = [
  {
    component: JSResource('FeedRoot', () => import('./components/feed/FeedRoot')),
    path: '/',
    exact: true,
    prepare: () => {
      const FeedQuery = require('./components/feed/__generated__/FeedRootQuery.graphql');   


      return {
        feedQuery: loadQuery(
          Environment, 
          FeedQuery, 
          {}, 
          {
          fetchPolicy: 'network-only',
        })
      }
    },
  },
  {
    component: JSResource('AuthRoot', () => import('./components/auth/AuthRoot')),
    path: '/',
    exact: false,
    routes: [
      {
        path: '/login',
        exact: true,
        component: JSResource('Login', () => import('./components/auth/Login'))
      },
      {
        path: '/register',
        exact: true,
        component: JSResource('Register', () => import('./components/auth/Register'))
      }
    ]
  }
];
