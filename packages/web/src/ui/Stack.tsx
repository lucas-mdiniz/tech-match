import React from 'react';
import styled from 'styled-components';
import { height } from 'styled-system';

const StyledStack = styled.div<Props>`
  ${height}

  display: block;
`;

type Props = {
  height: string
}

const Stack = ({ height } : Props) => {
  return(
    <StyledStack height={height} />
  )
}

export default Stack;