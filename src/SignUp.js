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
    window.addEventListener("resize", handleResize);
    getLocation();
  })

  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

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

      axios.post('/user/signup', submitData)
      .then(response => {
        console.log('New user signed up');
      })
      .catch(err => {
        console.error(err);
      })
      document.location.href = '/';
    }
  };

  return (
    <div className='w-screen flex'>
      <ThemeProvider theme={theme}>
        <Grid container component='main' sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
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
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box className='flex items-center my-10 mx-10'
              sx={{ flexDirection: 'column' }}
            >
              <Typography component='h1' variant='h4' color='secondary' align='center' mb='6px'>
              ADJACENT DOOR
              </Typography>
              <Typography component='h1' variant='h5' sx={{mt: 5}}>
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
                />
                <TextField
                  margin='dense'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lastName'
                />
                <TextField
                  margin='dense'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                />
                <TextField
                  margin='dense'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
                {(!validated && noticeValidEmail) && <Alert className='flex items-center mt-5'
                  severity='error'>Please enter valid email address
                </Alert> }
                {(!fillIn && notice) && <Alert className='flex items-center mt-5'
                  severity='error'>Please fill out all the required fields
                </Alert> }
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href='/login' variant='body2'>
                      {'Already a member? Log In'}
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
