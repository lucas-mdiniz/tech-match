import React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';
import { width } from 'styled-system';

const StyledField = styled(Field)`
  ${width}

  height: 50px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.secondaryText};
  color: ${(props) => props.theme.colors.primaryText};
  
  
  &::placholder{
    color: ${(props) => props.theme.colors.secondaryText};
  }
`

type Props = {
  name: string,
  placeholder: string,
  width: string
}

const TextInput = ({name, placeholder, width} : Props) => {
  return(
    <StyledField name={name} placeholder={placeholder} width={width}/>
  )
}

export default TextInput;