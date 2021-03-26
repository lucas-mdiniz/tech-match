import { graphql } from 'react-relay';


export const ProjectAdd = graphql`
  mutation ProjectAddMutation($connections: [ID!]!, $input: ProjectAddInput!){
    ProjectAddMutation(input: $input){
      error,
      projectEdge @prependEdge(connections: $connections){
        node{
          id,
          title,
          description,
          lookingFor
        },  
        cursor
      }
    }
  }
`;
