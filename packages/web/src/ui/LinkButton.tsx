import styled from 'styled-components';
import { width, color, background, fontWeight, fontSize } from 'styled-system';
import { Link } from '@workshop/route';

export default styled(Link)`
  ${width}
  ${color}
  ${background}
  ${fontWeight}
  ${fontSize}
  border: none;
  border-radius: 10px;
  height: 50px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  line-height: 30px;
  padding: 10px;
`;