import React from 'react';

const DeleteIcon = props => (
  <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM15 13.6L13.6 15L10 11.4L6.4 15L5 13.6L8.6 10L5 6.4L6.4 5L10 8.6L13.6 5L15 6.4L11.4 10L15 13.6Z" fill={props.color || 'black'} />
  </svg>

);

export default DeleteIcon;