import React, { useState }from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

const UploadPhoto = (props) => {

  const [hideButton, setHideButton] = useState(true);

  const storeImages = (imageInput) => {
    const formData = new FormData();
    formData.append('file', imageInput[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/image/upload`, formData)
    .then((response) => {
      props.setPhoto(response.data.secure_url);
      setHideButton(false);
    })
    .catch((err) => {console.log(err)})
  }

  return (
    <div>
      <Typography variant='h6' component='h2'>
        Would you like to upload a photo?
      </Typography>
      <input type="file" id='file' onChange={(e) => {
        storeImages(e.target.files);
      }} />
      <Button disabled={hideButton}
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