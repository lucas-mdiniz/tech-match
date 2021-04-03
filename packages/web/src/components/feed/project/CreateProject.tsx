import React from 'react';
import * as yup from 'yup';
import { useMutation } from 'react-relay/hooks';
import {ConnectionHandler, ROOT_ID} from 'relay-runtime';
import { Formik, Form, FormikHelpers } from 'formik';
import { DialogProps } from 'reakit/Dialog';
import { Heading } from 'rebass/styled-components';

import TextInput from '../../../ui/TextInput';
import Button from '../../../ui/Button';
import Stack from '../../../ui/Stack';
import FormError from '../../../ui/FormError';
import Modal from '../../../ui/Modal';

import { ProjectAdd } from './ProjectAddMutation'; 

interface Props {
  dialog: DialogProps,
}

interface FormValues {
  title: string,
  description: string,
  lookingFor: string,
}

const CreateProject = ({ dialog } : Props) => {
  const [commit, isInFlight] = useMutation(ProjectAdd);

  const initialValues = {
    title: '',
    description: '',
    lookingFor: ''
  }

  const connectionId = ConnectionHandler.getConnectionID(ROOT_ID, "Feed_projects");

  const CreateProject = yup.object().shape({
    title: yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(100)
      .required('Required'),
    description: yup.string()
      .min(3, 'Description must be at least 3 characters')
      .required('Required'),
    lookingFor: yup.string().oneOf(['developer', 'designer']).required('Required'),
  });

  const handleSubmit = (values : FormValues, { resetForm } : FormikHelpers<FormValues>) => {
    commit({
      variables:{
        connections: [connectionId],
        input: {
          ...values
        }
      },
      onCompleted() {
        dialog.hide && dialog.hide();

        resetForm();
      },
    })
  }

  return(
    <Modal dialog={dialog}>
        <Formik 
          initialValues={initialValues} 
          onSubmit={handleSubmit} 
          validationSchema={CreateProject}
        >
          {({ errors, touched }) => (
            <Form>
              <Heading color="accent" textAlign="center" fontSize="4">Create Project</Heading>
              <Stack height="20px"/>
              <TextInput 
                name="title" 
                width="100%" 
                placeholder="Project title"
                label="Title"
                borderColor={(errors.title && touched.title) ? 'alert' : undefined}
              />
            
                {errors.title && touched.title ? (
                  <FormError color="alert" mt="10px">{errors.title}</FormError>
                ) : null}
              
              <Stack height="20px" />
              <TextInput 
                as="textarea" 
                name="description" 
                width="100%" 
                placeholder="Project description"
                rows={10}
                height="auto"
                label="Description"
                borderColor={(errors.description && touched.description) ? 'alert' : undefined}
              />
              {errors.description && touched.description ? (
                <FormError color="alert" mt="10px">{errors.description}</FormError>
              ) : null}
              <Stack height="20px" />
              <TextInput 
                name="lookingFor" 
                width="100%" 
                as="select" 
                label="Looking for"
                borderColor={(errors.lookingFor && touched.lookingFor) ? 'alert' : undefined}
              >
                <option value="" disabled>Looking for:</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
              </TextInput>
              {errors.lookingFor && touched.lookingFor ? (
                <FormError color="alert" mt="10px">{errors.lookingFor}</FormError>
              ) : null}
              <Stack height="20px" />
              <Button 
                type="submit" 
                bg="accent" 
                fontWeight="bold" 
                width="200px" 
                margin="0 auto"
                display="block"
                disabled = {isInFlight || (Object.keys(errors).length !== 0)}
              >Create Project</Button>
            </Form>
          )}
        </Formik>
    </Modal>
  )
}

export default CreateProject;