import React from 'react';
import { graphql } from 'react-relay'
import { usePreloadedQuery } from 'react-relay/hooks';
import { useDialogState } from 'reakit/Dialog';

import Header from '../header/Header';
import Feed from './Feed';
import PageWrapper from '../../ui/PageWrapper';
import PageContainer from '../../ui/PageContainer';
import CreateProject from '../feed/project/CreateProject';

import { FeedRootQuery } from './__generated__/FeedRootQuery.graphql';

const FeedQuery = graphql`
    query FeedRootQuery {
      ...FeedListFragment
    }
  `;

type Props = {
  prepared: {
    feedQuery: any,
  }
}

const FeedRoot = ({prepared} : Props) => {

  const data = usePreloadedQuery<FeedRootQuery>(FeedQuery, prepared.feedQuery);
  const dialog = useDialogState();

  return (
    <>
      <PageWrapper>
        <Header dialog={dialog}/>
        <PageContainer>
          <Feed query={data} />
        </PageContainer>
      </PageWrapper>
      <CreateProject dialog={dialog} />
    </>
  );
}

export default FeedRoot;