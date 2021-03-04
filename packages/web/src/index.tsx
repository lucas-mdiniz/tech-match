import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import { RoutingContext, createRouter  } from '@workshop/route';
import { createBrowserHistory } from 'history';
import App from './App';

import { routes } from './routes';
const router = createRouter(routes, createBrowserHistory());

ReactDOM.render(
  <RoutingContext.Provider value={router.context}>
    <App />
  </RoutingContext.Provider>, document.getElementById('root')
);

