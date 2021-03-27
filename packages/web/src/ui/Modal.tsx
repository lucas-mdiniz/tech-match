import React from 'react';
import styled from 'styled-components';
import { DialogBackdrop, Dialog, DialogProps } from 'reakit/Dialog';

const StyledDialogBackdrop = styled(DialogBackdrop)`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0px;
  z-index: 999;
`;

const StyledDialog = styled(Dialog)`
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 35px;
  max-height: calc(100vh - 56px);
  width: 720px;
  outline: 0;
  max-width: 90%;
  border: 1px solid ${({theme}) => theme.colors.divider};
  z-index: 999;
`;

interface Props {
  dialog: DialogProps,
  children: React.ReactNode
}

const Modal = ({ dialog, children } : Props) => {  
  return (
    <StyledDialogBackdrop {...dialog}>
      <StyledDialog {...dialog}>
        {children}
      </StyledDialog>
    </StyledDialogBackdrop>
  )
}

export default Modal;