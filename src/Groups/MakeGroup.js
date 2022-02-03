import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import UploadPhoto from './UploadPhoto';
import axios from 'axios';
import { validGroupNameInputs, validDescriptionInputs, validIntegerInputs } from '../Regex';

function MakeGroup(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetInputs();
  };
  const [slide, setSlide] = useState('p1');
  const [groupName, setGname] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [local, setLocal] = useState('global');
  const [photo, setPhoto] = useState('http://placecorgi.com/260/180');
  const [localRadius, setRadius] = useState(5);

  const [location, setLocation] = useState({
    place: '',
    city: '',
    state: '',
    zip: '',
    coordinates: [null, null],
  });

  useEffect(() => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${props.currentLocation.longitude},${props.currentLocation.latitude}.json?access_token=pk.eyJ1IjoiZGtzOTk0NTUiLCJhIjoiY2t6MGU0eG9iMDk3dzJ3cWZqd2t3eWFoYiJ9.y7P9NQjeplt8JiSmTxDkdQ`)
    .then((results) => {
      setLocation({
        place: results.data.features[1].place_name,
        city: results.data.features[2].text,
        state: results.data.features[4].text,
        zip: results.data.features[1].text,
        coordinates: [props.currentLocation.longitude, props.currentLocation.latitude]
      });
    })
  }, [props.currentLocation.longitude, props.currentLocation.latitude])

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
    p: 4,
  };

  const createAGroup = () => {
    console.log('posting data', groupName, props.user.network_id, location.city, location.state, location.zip, location.coordinates[1], location.coordinates[0], privacy, photo, description)

    let privacybool = privacy === 'public' ? false : true;

    axios.post(`${process.env.REACT_APP_SERVER}/groups/user`, {
      name: groupName,
      network_id: props.user.network_id,
      city: location.city,
      state: location.state,
      zip: location.zip,
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
      privacy: privacybool,
      photo: photo,
      description: description
    })
    .catch(err => console.log(err))
  }

  const resetInputs = () => {
    setGname('');
    setDescription('');
    setPrivacy('public');
    setLocal('global');
    setPhoto('');
  };

  const renderSlide = (slide) => {
    switch (slide) {
      case 'p1':
        return (
          <div>
            <Typography variant='h6' component='h2'>
              Group Name
            </Typography>
            <TextField
              id='getGroupName'
              type='text'
              value={groupName || ''}
              onChange={(e) => {
                setGname(e.target.value);
              }}
            ></TextField>
            <Typography>Choose a name for your group</Typography>
            <Button
              onClick={() => {
                if (validGroupNameInputs.test(groupName.trim())) {
                  setGname(groupName.trim());
                  setSlide('p2');
                } else {
                  alert('Please enter a valid group name.');
                }
              }}
            >
              NEXT
            </Button>
          </div>
        );
      case 'p2':
        return (
          <div>
            <Typography variant='h6' component='h2'>
              Description
            </Typography>
            <TextField
              id='getGroupDescription'
              type='text'
              value={description || ''}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></TextField>
            <Typography>Please give us a brief description of your group</Typography>
            <Button
              onClick={() => {
                if (validDescriptionInputs.test(description)) {
                  setSlide('p3');
                } else {
                  alert('Please remove non-alphanumeric characters from your description');
                }
              }}
            >
              NEXT
            </Button>
          </div>
        );
      case 'p3':
        return (
          <div>
            <Typography variant='h6' component='h2'>
              Group Location
            </Typography>
            <Typography>Your group will be based in {location.place}.</Typography>
            <Button
              onClick={() => {
                setSlide('p4');
              }}
            >
              NEXT
            </Button>
          </div>
        );
      case 'p4':
        return (
          <div>
            <FormControl>
              <FormLabel id='local-or-global-radios'>Settings</FormLabel>
              <RadioGroup
                aria-labelledby='local-or-global-radios'
                defaultValue='global'
                name='radio-butt'
              >
                <FormControlLabel
                  value='global'
                  control={<Radio />}
                  label='Global'
                  onClick={() => {
                    setLocal('global');
                  }}
                ></FormControlLabel>
                <FormControlLabel
                  value='local'
                  control={<Radio />}
                  label='Local'
                  onClick={() => {
                    setLocal('local');
                  }}
                ></FormControlLabel>
                {local === 'local' ? (
                  <TextField
                    type='number'
                    placeholder='preferred mile radius'
                    value={localRadius || ''}
                    onChange={(e) => {
                      setRadius(e.target.value);
                    }}
                  ></TextField>
                ) : (
                  ''
                )}
              </RadioGroup>
              <FormLabel id='local-or-global-radios'>Privacy</FormLabel>
              <RadioGroup aria-labelledby='privacy-radios' defaultValue='public' name='radio-butt'>
                <FormControlLabel
                  value='public'
                  control={<Radio />}
                  label='Public'
                  onClick={() => {
                    setPrivacy('public');
                  }}
                ></FormControlLabel>
                <FormControlLabel
                  value='private'
                  control={<Radio />}
                  label='Private'
                  onClick={() => {
                    setPrivacy('private');
                  }}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
            <Button
              onClick={() => {
                if (validIntegerInputs.test(localRadius)) {
                  setSlide('p5');
                } else {
                  alert('Please provide a valid integer radius');
                }
              }}
            >
              NEXT
            </Button>
          </div>
        );
      case 'p5':
        return (
          <div>
            <UploadPhoto createAGroup={createAGroup} setSlide={() => {setSlide('p1')}} handleClose={handleClose} setPhoto={setPhoto}/>
          </div>
        );
      default:
        return <div>ERROR</div>;
    }
  };

  return (
    <div className='makeGroupModal'>
      <Button variant='outlined' onClick={handleOpen}>
        Create
      </Button>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setSlide('p1');
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>{renderSlide(slide)}</Box>
      </Modal>
    </div>
  );
}

export default MakeGroup;
