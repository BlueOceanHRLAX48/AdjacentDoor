import React from 'react';
import { Button, Typography } from '@mui/material';

const UploadPhoto = ({props}) => {

  return (
    <div>
      <Typography variant='h6' component='h2'>
        Would you like to upload a photo?
      </Typography>
      {/* PHOTO FUNCTIONALITY */}
      <Button
        onClick={() => {

        }}
        >
        UPLOAD PHOTO
      </Button>
      <Button
        onClick={() => {
          props.createAGroup();
          props.setSlide('p1');
          props.handleClose();
        }}
        >
        CREATE GROUP
      </Button>
    </div>
  )
}

export default UploadPhoto