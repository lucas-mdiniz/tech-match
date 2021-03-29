import React from 'react';
import {graphql} from 'react-relay';
import styled from 'styled-components';
import { color, fontSize } from 'styled-system';
import { useFragment } from 'react-relay/hooks';
import { Heading, Text } from 'rebass/styled-components';
import { FaRegHeart } from 'react-icons/fa';
import { useDialogState, DialogDisclosure } from 'reakit/Dialog'


import { Project_project$key } from './__generated__/Project_project.graphql';

import Card from '../../../ui/Card';
import Stack from '../../../ui/Stack';
import Tag from '../../../ui/Tag';
import Modal from '../../../ui/Modal';
import ProjectDetails from './ProjectDetails';

const LikeButton = styled(FaRegHeart)`
  ${color}
  ${fontSize}
  position: absolute;
  top: 20px;
  right: 20px;
`;
 
type Props = {
  project: Project_project$key;
}

const Project = (props : Props) =>{
  const ProjectFragment = graphql `
    fragment Project_project on Project {
        title
        description
        lookingFor
        id
        ...ProjectDetails
    }
  `;

  const data = useFragment<Project_project$key>(ProjectFragment, props.project);

  const dialog = useDialogState();

  return (
    <>
      <DialogDisclosure {...dialog} as={Card} cursor="pointer">
        <Heading as="h2" color="primaryText" fontSize="3" paddingRight="24px">{data.title}</Heading>
        <Stack height="20px"/>
        <Text color="secondaryText" fontSize="0">
          {data.description}
        </Text>
        <Stack height="20px"/>
        <Text color="secondaryText" fontSize="0">
          Looking for: <Tag>{data.lookingFor}</Tag>
        </Text>
        <LikeButton color="accent" fontSize="3"/>
      </DialogDisclosure>
      {dialog.visible && (
        <Modal dialog={dialog}>
          <ProjectDetails project={data}/>
        </Modal>  
      )}
    </>
  )
}

export default Project;