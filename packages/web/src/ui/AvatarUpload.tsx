import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useField } from 'formik';
import { Button } from 'reakit/Button';
import { FaUpload, FaEdit } from 'react-icons/fa';

interface StyledUploadButtonProps {
  imgSrc: string | null;
}

const StyledUploadButton = styled(Button)<StyledUploadButtonProps>`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({theme}) => theme.colors.secondaryText};
  border: 1px dashed;
  cursor: pointer;

  ${({imgSrc}) => imgSrc ? `
      background-image: url(${imgSrc});
      background-size: cover;
      background-position: center;
      position: relative;
      svg {
        opacity: 0;
        fill: #fff;
        z-index: 2;
        transition: 300ms;
      }
      &:after{
        content: '';
        width: 100%;
        height: 100%;
        background: #000;
        position: absolute;
        opacity: 0;
        border-radius: 50%;
        z-index: 1;
        transition: 300ms;
      }
      &:hover {
        svg {
          display: block;
          opacity: 1;
        }

        &:after{
          opacity: 0.4;
        }
      }
    ` :
    `
      &:hover {
        background: #f1f1f1;
      }
    `
  }

  
`;

interface Props {
  name: string;
}

const AvatarUpload = ({name} : Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [field, meta, helpers] = useField(name);

  const reader = new FileReader();

  const handleUploadClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click();
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if(e.currentTarget.files?.length){
      helpers.setValue(e.currentTarget.files[0]);
    }

    const element = hiddenFileInput.current;

    const file = element?.files && element?.files[0];
    
    file && reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    }
  }

  return (
    <>
      <StyledUploadButton 
        as="div" 
        aria-label="Add Profile picture" 
        onClick={handleUploadClick}
        imgSrc={avatar}
      >
        {!avatar ? <FaUpload /> : <FaEdit />}
      </StyledUploadButton>
    
      <input 
        name={field.name}
        onBlur={field.onBlur}
        onChange={handleChange}
        ref={hiddenFileInput} 
        type="file" 
        accept="image/jpeg,image/png,image/webp" 
        hidden
      />
    </>
  );
}

export default AvatarUpload;