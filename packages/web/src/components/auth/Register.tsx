import React from 'react';
import { Formik, Form } from 'formik';
import { Heading, Text, Box, Flex } from 'rebass/styled-components';
import * as yup from 'yup';

import Stack from '../../ui/Stack';
import TextInput from '../../ui/TextInput';
import {RadioGroup, RadioItem} from '../../ui/RadioGroup';
import Button from '../../ui/Button';
import AvatarUpload from '../../ui/AvatarUpload';
import FormError from '../../ui/FormError';

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
    profilePicture: {}
  }

  const registerSchema = yup.object().shape({
    email: yup.string().email('You must provide a valid email').required('Required'),
    userName: yup.string().required('Required'),
    role: yup.string().oneOf(['developer', 'designer']).required('Required'),
    password: yup.string().required('Required'),
    confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
    profilePicture: yup.mixed()
      .test("FILE_FORMAT", "Uploaded file has unsupported format.", value => value && ["image/jpeg","image/png","image/webp"].includes(value.type))
      .required('Required')
  })

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
        <Formik 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <AvatarUpload name="profilePicture"/>
              {errors.profilePicture && touched.profilePicture ? (
                <FormError color="alert" mt="10px">{errors.profilePicture}</FormError>
              ) : null}
              <Stack height="30px" />
              <TextInput 
                name="email" 
                placeholder="Email" 
                aria-label="Email" 
                width="100%"
                type="email"
              />
              {errors.email && touched.email ? (
                <FormError color="alert" mt="10px">{errors.email}</FormError>
              ) : null}
              <Stack height="30px" />
              <TextInput 
                name="userName" 
                placeholder="User name" 
                aria-label="User name" 
                width="100%"
                autoComplete="name"
              />
              {errors.userName && touched.userName ? (
                <FormError color="alert" mt="10px">{errors.userName}</FormError>
              ) : null}
              <Stack height="30px" />
              <RadioGroup label="Role">
                <RadioItem name="role" value="developer" checked={true}>
                  Developer
                </RadioItem>
                <RadioItem name="role" value="designer">
                  Designer
                </RadioItem>
              </RadioGroup>
              {errors.role && touched.role ? (
                <FormError color="alert" mt="10px">{errors.role}</FormError>
              ) : null}
              <Stack height="30px" />
              <TextInput 
                name="password" 
                placeholder="Password" 
                aria-label="Password" 
                width="100%"
                type="password"
                autoComplete="new-password"
              />
              {errors.password && touched.password ? (
                <FormError color="alert" mt="10px">{errors.password}</FormError>
              ) : null}
              <Stack height="30px" />
              <TextInput 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                aria-label="Confirm Password" 
                width="100%"
                type="password"
                autoComplete="new-password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <FormError color="alert" mt="10px">{errors.confirmPassword}</FormError>
              ) : null}
              <Stack height="30px" />
              <Button 
                backgroundColor="accent" 
                fontSize="2" 
                fontWeight="bold"
                width="100%"
                type="submit"
              >Register</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default Register;