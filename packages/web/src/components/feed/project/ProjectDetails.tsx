import React from 'react';
import { useFragment, graphql } from 'react-relay/hooks';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { ProjectDetails$key } from './__generated__/ProjectDetails.graphql';

import {Heading, Text} from 'rebass/styled-components';
import TextInput from '../../../ui/TextInput';
import Stack from '../../../ui/Stack';
import Tag from '../../../ui/Tag';
import FormError from '../../../ui/FormError';
import Button from '../../../ui/Button';
import ProfileHeader from '../../../ui/ProfileHeader';

interface Props {
  project: ProjectDetails$key
}

interface Values {
  message: string
}

const ProjectDetails = (props : Props) => {
  const ProjectDetailsFragment = graphql`
    fragment ProjectDetails on Project{
      title,
      description,
      lookingFor
    }
  `

  const data = useFragment<ProjectDetails$key>(ProjectDetailsFragment, props.project);

  console.log(data);
  
  const initialValues = {
    message: ''
  }

  const messageSchema = yup.object().shape({
    message: yup.string().required('This field is required'),
  })

  const handleSubmit = (values : Values) => {
    console.log(values);
  }

  return (
    <>
      <ProfileHeader />
      <Stack height="20px" />
      <Heading as="h2" textAlign="center" color="primaryText" fontSize="3" paddingRight="24px">{data.title}</Heading>
      <Stack height="20px"/>
      <Text color="secondaryText" fontSize="0">
        {data.description}
      </Text>
      <Stack height="20px"/>
      <Text color="secondaryText" fontSize="0">
        Looking for: <Tag>{data.lookingFor}</Tag>
      </Text>
      <Stack height="35px"/>
      <Heading as="h2" color="primaryText" fontSize="3" paddingRight="24px">Send a message:</Heading>
      <Stack height="20px"/>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={messageSchema}>
        {({errors, touched}) => (
          <Form>
            <TextInput 
              as="textarea" 
              name="message" 
              width="100%" 
              placeholder="Send a message to the project owner"
              rows={10}
              height="auto"
              aria-label="Send a message"
              borderColor={(errors.message && touched.message) ? 'alert' : undefined}
            />
            {errors.message && touched.message ? (
              <FormError color="alert" mt="10px">{errors.message}</FormError>
            ) : null}
            <Stack height="20px" />
            <Button fontSize={2} bg="accent" width="200px" margin="0 auto" display="block" fontWeight="bold">Send</Button>
          </Form>
        )}
        
      </Formik>
    </>

  )
}

export default ProjectDetails