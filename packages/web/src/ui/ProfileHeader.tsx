import React from 'react';
import styled from 'styled-components';
import { Text, Flex } from 'rebass/styled-components'

import Avatar from './Avatar';

const DetailsWrapper = styled.div`
  margin-left: 15px;
`;

const ProfileHeader = () => {
  return (
    <Flex alignItems="center">
      <Avatar size={50} alt="Lucas Diniz"/>
      <DetailsWrapper>
        <Text fontSize={3} fontWeight="bold" color="primaryText">
          Lucas Diniz
        </Text>
        <Text color="secondaryText">
          Designer
        </Text>
      </DetailsWrapper>
    </Flex>
  );
}

export default ProfileHeader;