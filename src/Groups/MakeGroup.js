import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from'@mui/material';
import axios from 'axios';
import LeftBar from '../LeftBar';
import { Link } from 'react-router-dom';

function MakeGroup (props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [slide, setSlide] = useState('p1');
  const [groupName, setGname] = useState('');
  const [description, setDescription] = useState('');
  const [coordinates, setCoordinates] = useState([null, null]); // lng lat
  const [place, setPlace] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [local, setLocal] = useState('global');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCoordinates([position.coords.longitude, position.coords.latitude])
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1IjoiZGtzOTk0NTUiLCJhIjoiY2t6MGU0eG9iMDk3dzJ3cWZqd2t3eWFoYiJ9.y7P9NQjeplt8JiSmTxDkdQ`)
      .then((results) => {
        setPlace(results.data.features[1].place_name);
        setCity(results.data.features[2].text);
        setZip(results.data.features[1].text);
      })
    })
  }, [city, zip])

  const modalStyle = {
    display: 'flex',
    position: 'absolute',
    top: `25%`,
    left: `25%`,
    transform: 'translate(-25%. -25%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid $000',
    boxShadow: 24,
    p: 4
  }

  const fakeAxiosPost = () => {
    console.log('POSTING, ', groupName, description, coordinates, city, zip, privacy, local, photo);
  }

  const renderSlide = (slide) => {
    switch (slide) {
      case 'p1':
        return <div>
          <Typography variant="h6" component="h2">Group Name</Typography>
          <TextField id="getGroupName" type='text' onChange={(e) => {
            setGname(e.target.value);
          }}></TextField>
          <Typography>Choose a name for your group</Typography>
          <Button onClick={() => {
            setSlide('p2');
          }}>NEXT</Button>
        </div>;
      case 'p2':
        return <div>
          <Typography variant="h6" component="h2">Description</Typography>
          <TextField id="getGroupDescription" type='text' onChange={(e) => {
            setDescription(e.target.value);
          }}></TextField>
          <Typography>Please give us a brief description of your group</Typography>
          <Button onClick={() => {
            setSlide('p3');
          }}>NEXT</Button>
        </div>;
      case 'p3':
        return <div>
          <Typography variant="h6" component="h2">Group Location</Typography>
          <Typography>Your group will be based in {place}.</Typography>
          <Button onClick={() => {
            setSlide('p4');
          }}>NEXT</Button>
        </div>;
      case 'p4':
        return <div>
          <FormControl>
            <FormLabel id="local-or-global-radios">Settings</FormLabel>
            <RadioGroup
              aria-labelledby="local-or-global-radios"
              defaultValue="global"
              name="radio-butt"
            >
              <FormControlLabel value="global" control={ <Radio /> } label="Global" onClick={() => {
                setLocal('global');
              }}></FormControlLabel>
              <FormControlLabel value="local" control={ <Radio /> } label="Local" onClick={() => {
                setLocal('local');
              }}></FormControlLabel>
            </RadioGroup>
            <FormLabel id="local-or-global-radios">Privacy</FormLabel>
            <RadioGroup
              aria-labelledby="privacy-radios"
              defaultValue="public"
              name="radio-butt"
            >
              <FormControlLabel value="public" control={ <Radio /> } label="Public" onClick={() => {
                setPrivacy('public');
              }}></FormControlLabel>
              <FormControlLabel value="private" control={ <Radio /> } label="Private" onClick={() => {
                setPrivacy('private');
              }}></FormControlLabel>
            </RadioGroup>
          </FormControl>
          <Button onClick={() => {
            setSlide('p5');
          }}>NEXT</Button>
        </div>;
      case 'p5':
        return <div>
          <Typography variant="h6" component="h2">Choose a Photo</Typography>
          {/* PHOTO FUNCTIONALITY */}
          <Button onClick={() => {
              fakeAxiosPost();
              handleClose();
          }}>CREATE</Button>
        </div>
      default:
        return <div>ERROR</div>;
    }
  }

  return <div className="">
    <LeftBar />
    <button style={modalStyle} onClick={handleOpen}>Create New Group</button> {/* Create New Group button placeholder */}
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setSlide('p1');
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        {renderSlide(slide)}
      </Box>
    </Modal>
  </div>;
}

export default MakeGroup;