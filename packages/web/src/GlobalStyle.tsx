import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${(props) => props.theme.fonts.body};
  }
  
  body * {
    font-size: ${(props) => props.theme.fontSizes[0]}px;
  }
`;

export default GlobalStyle;