/* eslint-disable no-unused-vars */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import ImageUploadIcon from '../constants/icons/ImageUploadIcon';

function ImageDragDrop({ setFieldValue, setImage }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg']
    },
    maxSize: 400,
    multiple: false,
    onDrop: acceptedFiles => {
      setImage({ file: acceptedFiles[0], preview: URL.createObjectURL(acceptedFiles[0]) });
      setFieldValue('image', URL.createObjectURL(acceptedFiles[0]));
    }
  });
  return (
    <div className='imageDropzone' {...getRootProps()} >
      <ImageUploadIcon />
      <div className='imageUploadTextDiv'>
        <span>Sürükleyip bırakarak yükle</span>
        <span>veya</span>
      </div>

      <div className='inputDiv'>
        Görsel Seçin
        <input {...getInputProps()} />
      </div>
      <div className='imageRestriction'>
        PNG,JPEG ve JPG Dosya boyutu max. 400kb
      </div>
    </div>
  );
}

export default ImageDragDrop;