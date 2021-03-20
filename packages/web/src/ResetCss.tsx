import { createGlobalStyle } from 'styled-components';

const ResetCss = createGlobalStyle`
  *, 
  *:after,
  *:before {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      text-decoration: none;
  }
  body{
      font-size: 100%;
      list-style-type: none;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }

`;

export default ResetCss;