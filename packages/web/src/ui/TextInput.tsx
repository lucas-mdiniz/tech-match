import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { height, width, borderColor } from 'styled-system';

interface StyledFieldProps {
  id: string
}

const StyledField = styled.input<StyledFieldProps>`
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

const StyledLabel = styled.label`
  margin-bottom: 8px;
  display: block;
`;

StyledField.defaultProps = {
  height: '50px',
}

type Props = {
  name: string,
  placeholder?: string,
  width?: string,
  type?: string,
  autoComplete?: string,
  as?: string | React.ComponentType,
  rows?: Number,
  height?: string,
  children?: React.ReactNode,
  label?: string,
  borderColor?: string,
}

const TextInput = ({name, children, label, ...props} : Props) => {
  const [field] = useField(name);
    
  return( 
    <>
    {label && <StyledLabel htmlFor={field.name}>{label}</StyledLabel>}
    <StyledField 
      {...field}
      {...props}
      id={field.name}
    >
       {children}
    </StyledField>
    </>
  )
}

export default TextInput;