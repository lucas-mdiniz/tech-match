import React from 'react';
import { alignItems, flexDirection, justifyContent, space } from 'styled-system';
import styled from 'styled-components';

import { UserList_query } from './__generated__/UserList_query.graphql';

const Card = styled.a`
  border-radius: 2px;
  display: flex;
  max-width: 265px;
  width: 200px;
  background-color: #ffffff;
  box-shadow: 0 1px 5px 0 #dfdfdf, 0 1px 5px 0 #dfdfdf;
  flex-direction: column;
  cursor: pointer;
  margin: 10px;
  ${space}
  ${flexDirection}
  ${alignItems}
  ${justifyContent}
`;

type Props = {
  query:  UserList_query
}
const UserList = ({ query }: Props) => {

  return (
    <div>
      teste
    </div>
  )
};

export default UserList;
