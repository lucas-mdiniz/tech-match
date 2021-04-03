import React from 'react';
import styled from 'styled-components';
import {Field} from 'formik';

const StyledLabel = styled.label`
  color: ${({theme}) => theme.colors.secondaryText};
  padding: 0 15px;

  input {
    margin-right: 10px;
  }
`

interface ItemProps {
  name: string;
  value: string;
  children: string;
  checked?: Boolean;
}

const RadioItem = ({name, value, children, checked} : ItemProps) => {
  return (
    <StyledLabel>
      <Field type="radio" name={name} value={value} checked={checked}/>
      {children}
    </StyledLabel>
  )
}

interface GroupProps {
  label: string;
  children: React.ReactNode;
}

const StyledRadioGroup = styled.div`
  text-align: center;
  margin: 0 -15px;
`; 

const RadioGroup = ({label, children} : GroupProps) => {
  return(
    <StyledRadioGroup role="group" aria-label={label}>
      {children}
    </StyledRadioGroup>
  )
}

export { RadioGroup, RadioItem };