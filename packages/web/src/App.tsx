import React from 'react';
import { RouterRenderer } from '@workshop/route';

import Providers from './Providers';
import GlobalStyle from './GlobalStyle';
import ResetCss from './ResetCss';

function App() {
  return (
    <Providers>
        <ResetCss/>
        <GlobalStyle/>
        <RouterRenderer/>
    </Providers>
  );
}

export default App;
