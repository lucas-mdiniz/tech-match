import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  size?: number;
}

const Wrapper = styled.div<WrapperProps>`
  ${({size}) => size && `
    width: ${size}px;
    height: ${size}px;
  `}
  font-size: ${({size}) => size ? `${size/2.5}px` : '20px'};
  ${({theme}) => `background: ${theme.colors.accent}`}
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

Wrapper.defaultProps = {
  size: 70,
}

interface Props {
  size: number;
  alt: string;
  src?: string;
}

const Avatar = ({alt, src, size} : Props) => {
  const [hasImage, setHasImage] = useState(true);

  const img = new Image();
  img.src = src || '';

  const userNames = alt.split(" ");
  const userInitials = userNames[0][0] + userNames[userNames.length-1][0];


  useEffect(() => {
    img.onerror = () => setHasImage(false);
  }, [src]);

  
  if(!hasImage){
    return <Wrapper size={size}>{userInitials}</Wrapper>
  }

  return (
    <Wrapper size={size}>
      <img src={src} alt={alt} />
    </Wrapper>
  )

}

export default Avatar;