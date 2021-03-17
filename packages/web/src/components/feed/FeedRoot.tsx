import React from 'react';
import { graphql } from 'react-relay'
import { usePreloadedQuery } from 'react-relay/hooks';

import Feed from './Feed';
import PageWrapper from '../../ui/PageWrapper';
import PageContainer from '../../ui/PageContainer';

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
  

  return (
    <PageWrapper>
      <PageContainer>
        <Feed query={data} />
      </PageContainer>
    </PageWrapper>
  );
}

export default FeedRoot;