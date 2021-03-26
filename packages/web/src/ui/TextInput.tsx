import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { height, width, borderColor } from 'styled-system';

export const StyledField = styled.input`
  ${width}
  ${height}
  
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.secondaryText};
  ${borderColor}
  color: ${(props) => props.theme.colors.primaryText};
  
  &::placholder{
    color: ${(props) => props.theme.colors.secondaryText};
  }
`;

StyledField.defaultProps = {
  height: '50px',
}

type Props = {
  name: string,
  placeholder?: string,
  width?: string,
  type?: string,
  autocomplete?: string,
  as?: string | React.ComponentType,
  rows?: Number,
  height?: string,
  children?: React.ReactNode,
  borderColor?: string
}

const TextInput = ({name, children, ...props} : Props) => {

  const [field] = useField(name);

  return( 
    <StyledField 
      {...field}
      {...props}
    >
       {children}
    </StyledField>
  )
}

export default TextInput;