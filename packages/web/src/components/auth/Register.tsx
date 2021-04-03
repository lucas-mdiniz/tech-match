import React from 'react';
import { Formik, Form } from 'formik';
import { Heading, Text, Box, Flex } from 'rebass/styled-components';

import Stack from '../../ui/Stack';
import TextInput from '../../ui/TextInput';
import {RadioGroup, RadioItem} from '../../ui/RadioGroup';
import Button from '../../ui/Button';
import AvatarUpload from '../../ui/AvatarUpload';

interface formValues {
  email: string;
  userName: string;
  role: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const initialValues = {
    email: '',
    userName: '',
    role: '',
    password: '',
    confirmPassword: '',
    profilePicture: ''
  }

  const handleSubmit = (values : formValues) => {
    console.log(values);
  }
  return(
    <Flex minHeight="100vh" padding="50px 15px" alignItems="center">
      <Box width="500px" maxWidth="100%" margin="0 auto">
        <Heading fontSize={5} color="accent" textAlign="center">Tech Match</Heading>
        <Stack height="50px" />
        <Text 
          fontSize={4} 
          color="primaryText" 
          textAlign="center" 
          fontWeight="bold"
        >
          Create your account
        </Text>
        <Stack height="50px" />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <AvatarUpload name="profilePicture"/>
            <Stack height="30px" />
            <TextInput 
              name="email" 
              placeholder="Email" 
              aria-label="Email" 
              width="100%"
            />
            <Stack height="30px" />
            <TextInput 
              name="userName" 
              placeholder="User name" 
              aria-label="User name" 
              width="100%"
            />
            <Stack height="30px" />
            <RadioGroup label="Role">
              <RadioItem name="role" value="developer">
                Developer
              </RadioItem>
              <RadioItem name="role" value="designer">
                Designer
              </RadioItem>
            </RadioGroup>

            <Stack height="30px" />
            <TextInput 
              name="password" 
              placeholder="Password" 
              aria-label="Password" 
              width="100%"
            />
            <Stack height="30px" />
            <TextInput 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              aria-label="Confirm Password" 
              width="100%"
            />
            <Stack height="30px" />
            <Button 
              backgroundColor="accent" 
              fontSize="2" 
              fontWeight="bold"
              width="100%"
              type="submit"
            >Register</Button>
          </Form>
        </Formik>
      </Box>
    </Flex>
  )
}

export default Register;