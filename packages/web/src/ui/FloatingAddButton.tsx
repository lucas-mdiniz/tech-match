import React from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';
import { Button } from 'rebass/styled-components';
import { FaPlus } from 'react-icons/fa';
import { DialogDisclosure, DialogProps } from 'reakit/Dialog'



const StyldeFloatingAddButton = styled(Button)`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${color}
`;

interface Props {
  dialog: DialogProps
}

const FloatingAddButton = ({ dialog } : Props) => {
    return(
      <StyldeFloatingAddButton {...dialog} bg="accent" color="icons" as={DialogDisclosure}>
        <FaPlus size="30px"/>
      </StyldeFloatingAddButton>
    )
}

export default FloatingAddButton;