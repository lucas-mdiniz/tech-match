import styled from 'styled-components';

const Card = styled.div`
  padding: 20px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.divider};
  position: relative;
`;

export default Card