import React from 'react';

import LoginIllustration from './assets/illustration';

import { color } from 'styled-system';
import { Flex, Box, Heading, Text } from 'rebass/styled-components';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import {Link} from '@workshop/route';

import TextInput from '../../ui/TextInput';
import Stack from '../../ui/Stack';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';

const TextDivider = styled(Text)`
  position: relative;
  text-align: center;
  
  span{
    background: #fff;
    padding: 0 10px;
    position: relative;
    z-index: 2;
  }

  &:before{
    content: '';
    position: absolute;
    border-top: 1px solid;
    display: block;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    z-index: 1;
  }
`;

const StyledLink = styled(Link)`
  ${color}
  text-align: center;
  display: block;
  text-decoration: none;
`

const Login = () => {
  const initialValues = {
    email: ''
  }

  const handleSubmit = (values) => {
    console.log(values);
  }

  return (
    
    <Flex alignItems="center" height="100vh">
      <Box width={1/2} display={['none', 'flex', 'flex']} height="100%" alignItems="center" backgroundColor="rgba(208,208,208, 0.2)">
        <LoginIllustration/>
      </Box>
      <Box width={[1, 1/2, 1/2]}>
        <Box maxWidth="350px" margin="0 auto">
          <Heading as="p" color="accent" textAlign="center" fontSize="5">Tech Match</Heading>
          <Stack height="35px" />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form>

              <TextInput name="email" placeholder="E-mail" width="100%" />
              <Stack height="35px" />
              <TextInput name="password" placeholder="Password" width="100%" />
              <Stack height="35px" />
              <Button width="100%" type="submit" color="icons" backgroundColor="accent" fontWeight="bold" fontSize="1">
                  Login
              </Button>
              <Stack height="35px" />
              <StyledLink to={"/register"} color="accent">Forgot password</StyledLink>
              <Stack height="35px" />
              <TextDivider color="secondaryText"><span>OR</span></TextDivider>
              <Stack height="35px" />
              <LinkButton to={"/register"} width="100%" color="icons" backgroundColor="primaryDark" fontWeight="bold" fontSize="1">
                  Registersss
              </LinkButton>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Flex>
  )
};

export default Login;
