import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './relay/Environment';
import { hot } from 'react-hot-loader';
import { RouterRenderer } from '@workshop/route';

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RouterRenderer />
    </RelayEnvironmentProvider>
  );
}

export default hot(module)(App);
