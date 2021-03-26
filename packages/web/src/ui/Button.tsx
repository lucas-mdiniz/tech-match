import React from 'react';
import styled from 'styled-components';
import { Button } from 'rebass/styled-components';
import {color, height, margin} from 'styled-system';

interface ButtonProps {
  as?: React.ComponentType;
}

Button.defaultProps = {
  height: '50px'
}

export default styled(Button)<ButtonProps>`
  ${color}
  ${height}
  ${margin}
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px;

  &:disabled{
    opacity: 0.5;
    cursor: not-allowed;
  }
`;