import React from 'react';
import { createBrowserHistory } from 'history';
import { unstable_createRoot as createRoot } from 'react-dom';

import { RoutingContext, createRouter  } from '@wokshop/route';

import App from './App';
import { routes } from './routes';

const router = createRouter(routes, createBrowserHistory());

createRoot(document.getElementById('root')).render(
  <RoutingContext.Provider value={router.context}>
    <App />
  </RoutingContext.Provider>,
);