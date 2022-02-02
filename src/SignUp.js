import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/muiTheme';
import axios from 'axios';

function SignUp() {
  const [notice, setNotice] = useState(false);
  const [fillIn, setFillIn] = useState(false);
  const [validated, setValidated] = useState(false);
  const [noticeValidEmail, setNoticeValidEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    getLocation();
  })

  const handleResize = () => {
    setIsMobile(!isMobile);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      console.log('Geolocation is not supported by this brower.')
    }
  }

  const getCoordinates = (position) => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    reverseGeocodeCoordinates(longitude, latitude);
  }

  const reverseGeocodeCoordinates = (longitude, latitude) => {
    let token = process.env.REACT_APP_MAPBOX_APP_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`;
    axios.get(url)
      .then(response => {
        const currentAddress = response.data.features[0].place_name;
        console.log(currentAddress);
        setAddress(currentAddress);
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
      address: address
    };
    if (!submitData.email.includes('@')) {
      setNoticeValidEmail(true);
    } else if (!submitData.firstName || !submitData.lastName || !submitData.username || !submitData.email) {
      setNotice(true);
      setFillIn(false);
    } else {
      setNotice(false);
      setValidated(true);
      setFillIn(true);
      if (JSON.parse(localStorage.getItem('loginData')).email === submitData.email) {
        alert('This email address has been taken. Do you already have an account?');
        document.location.href = '/login';
      } else {
        axios.post('/user/signup', submitData)
        .then(response => {
          console.log('New user signed up');
        })
        .catch(err => {
          console.error(err);
        })
        document.location.href = '/';
      }
    }
  };

  const style = () => {
    let fontStyle = {};
    if (isMobile) {
      fontStyle = {
        variant1: 'h2',
        variant2: 'h3',
        fontSize: 40,
        linkSize: 33,
        pt: '10%',
        pd: '1%'
      };
    } else {
      fontStyle = {
        variant1: 'h4',
        variant2: 'h5',
        fontSize: 18,
        linkSize: 18
      };
    }
    return fontStyle;
  }

  return (
    <div className='w-screen flex'>
      {/* <Button
        variant='contained'
        color='primary'
        onClick={handleResize}
        style={{
          height: style().logoSize,
          fontSize: style().linkSize,
          marginLeft: '90%',
          marginTop: '1%',
          position: 'absolute'
        }}
      >{isMobile ? 'Desktop' : 'Mobile'}</Button> */}
      <ThemeProvider theme={theme}>
        <Grid container component='main' sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={3}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={9} md={5} component={Paper} elevation={6} square>
            <Box className='flex items-center my-10 mx-10'
              sx={{ flexDirection: 'column' }}
            >
              <Typography
                component='h1'
                variant={ style().variant1 }
                color='secondary'
                fontFamily='Dancing Script'
                align='center'
              >
              ADJACENT DOOR
              </Typography>
              <Typography component='h1' variant={ style().variant2 } sx={{ mt: 2, mb: 1 }}>
                Sign Up
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                className='mt-1'
              >
                <TextField
                  margin='dense'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  name='firstName'
                  autoComplete='firstName'
                  inputProps={{ style: {fontSize: style().fontSize} }}
                  InputLabelProps={{ style: {fontSize: style().fontSize} }}
                />
                <TextField
                  margin='dense'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lastName'
                  inputProps={{ style: {fontSize: style().fontSize} }}
                  InputLabelProps={{ style: {fontSize: style().fontSize} }}
                />
                <TextField
                  margin='dense'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  inputProps={{ style: {fontSize: style().fontSize} }}
                  InputLabelProps={{ style: {fontSize: style().fontSize} }}
                />
                <TextField
                  margin='dense'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  inputProps={{ style: {fontSize: style().fontSize} }}
                  InputLabelProps={{ style: {fontSize: style().fontSize} }}
                />
                {(!validated && noticeValidEmail) && <Alert className='flex items-center mt-5'
                  severity='error'
                  sx={{ fontSize: style().fontSize }}
                >Please enter valid email address
                </Alert> }
                {(!fillIn && notice) && <Alert className='flex items-center mt-5'
                  severity='error'
                  sx={{ fontSize: style().fontSize }}
                >Please fill out all the required fields
                </Alert> }
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  style={{ fontSize: style().fontSize }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item sx={{ mt: 2, mb: 2 }}>
                    <Link
                      href='/login'
                      variant='body3'
                      style={{ fontSize: style().linkSize }}
                    >
                      {'Already a member? Log In or Sign Up through Google!'}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default SignUp;
