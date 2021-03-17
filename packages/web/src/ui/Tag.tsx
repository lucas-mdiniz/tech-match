import styled from 'styled-components';

const Tag = styled.div`
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.icons};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  display: inline-block;
  text-transform: uppercase;
  padding: 8px;
  border-radius: 10px;
`;

export default Tag;