import React from 'react';
//import styled from 'styled-components';
import { Text } from 'rebass/styled-components'

type Props = {
  children: string,
  color: string,
  mt: string
}

const FormError = ({ children, ...props } : Props) => {
  return <Text {...props}> {children} </Text>
}

export default FormError