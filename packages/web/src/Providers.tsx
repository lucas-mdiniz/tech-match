import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import {ThemeProvider} from 'styled-components';

import Environment from './relay/Environment';

const theme = {
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    accent: '#3D9841',
    primary: '#008074',
    primaryDark: '#004C44',
    primaryLight: '#B2DFDB',
    primaryText: '#212121',
    secondaryText: '#757575',
    divider: '#BDBDBD',
    icons: '#fff'
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
    text: 'Roboto, sans-serif'
  },
  fontWeights: {
    body: 400,
    medium: 500,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1,
    heading: 1,
  },
  fontSizes: [
    16, 18, 20, 24, 36, 64
  ],
};

type Props = {
  children: React.ReactNode,
  environment: typeof Environment
}

const Providers = ({children, environment = Environment}: Props) => {
  return(
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </RelayEnvironmentProvider>
  )
}

export default Providers