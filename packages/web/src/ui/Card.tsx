import styled from 'styled-components';

interface CardProps {
  cursor: string
}

const Card = styled.div<CardProps>`
  padding: 20px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.divider};
  position: relative;
  ${({cursor}) => cursor && `cursor: ${cursor};`}
`;

export default Card