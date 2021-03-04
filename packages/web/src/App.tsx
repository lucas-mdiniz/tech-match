import React from 'react';
import { RouterRenderer } from '@workshop/route';

import Providers from './Providers';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <Providers>
        <GlobalStyle/>
        <RouterRenderer/>
    </Providers>
  );
}

export default App;
