import styled from 'styled-components';
import { color, width, height } from 'styled-system';

const LoadingSpinner = styled.div`
  border-radius: 50%;
  border: 3px solid;
  border-right-color: transparent;
  border-bottom-color: transparent;
  ${color}
  ${width}
  ${height}
  display: inline-block;
  
  @keyframes rotate-forever { 
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  animation-duration: 750ms;
  animation-iteration-count: infinite;
  animation-name: rotate-forever;
  animation-timing-function: linear;
`;

export default LoadingSpinner;