import React from 'react';
import styled from 'styled-components';
import { graphql, usePaginationFragment } from 'react-relay/hooks';
import InfiniteScroll from 'react-infinite-scroller';

import Project from './Project';
import Stack from '../../ui/Stack';
import LoadingSpinner from '../../ui/LoadingSpinner';  

import { FeedListFragment$key } from './__generated__/FeedListFragment.graphql';
import { ProjectsListPaginationQuery } from './__generated__/ProjectsListPaginationQuery.graphql';

const LoadingWrapper = styled.div`
  text-align: center;
`;

type Props = {
  query: FeedListFragment$key 
}

const Feed = (props : Props) => {

  const ProjectListFragment = graphql`
    fragment FeedListFragment on Query
      @argumentDefinitions(first: {type: Int, defaultValue: 5}, after: { type: String })
      @refetchable(queryName: "ProjectsListPaginationQuery"){
        projects(first: $first, after: $after) @connection(key: "Feed_projects"){
          edges {
            node{
              ...Project_project
              id
            }
          }
        }
      }
  `;

  const { data, loadNext } = usePaginationFragment<ProjectsListPaginationQuery, _>(ProjectListFragment, props.query)


  const { pageInfo } = data.projects;

  const LoadingComponent = 
  <LoadingWrapper key={0}>
    <Stack height="30px"/>
    <LoadingSpinner width="40px" height="40px" color="accent"/>
  </ LoadingWrapper>
  
  return (
    <>
      <InfiniteScroll
        loadMore={loadNext}
        hasMore = {pageInfo.hasNextPage}
        loader={LoadingComponent}
      > 
        {data.projects?.edges.map(({ node }, index) =>
          <React.Fragment key={node.id}>
            <Project project={node} />

            {index < data.projects?.edges.length - 1 && <Stack height="30px"/>}
          </React.Fragment >
        )}
      </InfiniteScroll>
    </>
  );
}

export default Feed;