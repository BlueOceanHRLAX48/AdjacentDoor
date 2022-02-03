import React, { useState }from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

const UploadPhoto = (props) => {

  const [photo, setPhoto] = useState('');

  const storeImages = (imageInput) => {
    const formData = new FormData();
    formData.append('file', imageInput[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/image/upload`, formData)
    .then((response) => {
      setPhoto(response.data.secure_url);
    })
    .catch((err) => {console.log(err)})
    
  }

  return (
    <div>
      <Typography variant='h6' component='h2'>
        Would you like to upload a photo?
      </Typography>
      {/* PHOTO FUNCTIONALITY */}
      <input type="file" id='file' onChange={(e) => {
        storeImages(e.target.files);
      }} />
      <Button
        onClick={() => {
          props.setPhoto(photo);
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