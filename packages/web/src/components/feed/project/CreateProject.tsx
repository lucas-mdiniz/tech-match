import React from 'react';
import * as yup from 'yup';
import { useMutation } from 'react-relay/hooks';
import {ConnectionHandler, ROOT_ID} from 'relay-runtime';
import styled from 'styled-components';
import { Formik, Form, FormikHelpers } from 'formik';
import { DialogBackdrop, Dialog, DialogProps } from 'reakit/Dialog';
import { Heading } from 'rebass/styled-components';

import TextInput from '../../../ui/TextInput';
import Button from '../../../ui/Button';
import Stack from '../../../ui/Stack';
import FormError from '../../../ui/FormError';

import { ProjectAdd } from './ProjectAddMutation'; 

const StyledDialogBackdrop = styled(DialogBackdrop)`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0px;
  z-index: 999;
`;

const StyledDialog = styled(Dialog)`
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 35px;
  max-height: calc(100vh - 56px);
  width: 550px;
  outline: 0;
  max-width: 90%;
  border: 1px solid ${({theme}) => theme.colors.divider};
  z-index: 999;
`;

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
      .required('This field is required'),
    description: yup.string()
      .min(3, 'Description must be at least 3 characters')
      .required('This field is required'),
    lookingFor: yup.string().oneOf(['developer', 'designer']).required('This field is required'),
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
    <StyledDialogBackdrop {...dialog}>
      <StyledDialog {...dialog} aria-label="Create Project">
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
                aria-label="Project title"
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
                aria-label="Project description"
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
                aria-label="Professional you are looking for"
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
                maxWidth="100%"
                display="block"
                disabled = {isInFlight || (Object.keys(errors).length !== 0)}
              >Create Project</Button>
            </Form>
          )}
        </Formik>
      </StyledDialog>
    </StyledDialogBackdrop>
  )
}

export default CreateProject;