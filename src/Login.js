import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import { RiLoginCircleFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from 'react-google-login';
import theme from './components/muiTheme';
import axios from 'axios';

function Login() {
  const [isMobile, setIsMobile] = useState(false);
  const [notice, setNotice] = useState(false);
  const [fillIn, setFillIn] = useState(false);
  const [address, setAddress] = useState('');
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  useEffect(() => {
    getLocation();
  });

  const handleResize = () => {
    setIsMobile(!isMobile);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      console.log('Geolocation is not supported by this brower.');
    }
  };

  const getCoordinates = (position) => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    reverseGeocodeCoordinates(longitude, latitude);
  };

  const reverseGeocodeCoordinates = (longitude, latitude) => {
    let token = process.env.REACT_APP_MAPBOX_APP_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`;
    axios
      .get(url)
      .then((response) => {
        const currentAddress = response.data.features[0].place_name;
        setAddress(currentAddress);
        console.log(address);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      username: data.get('username'),
      email: data.get('email')
    };

    if (!submitData.username || !submitData.email) {
      setNotice(true);
      setFillIn(false);
    } else {
      setNotice(false);
      setFillIn(true);
      if (JSON.parse(localStorage.getItem('loginData')).email !== submitData.email) {
        alert('We couldn\'t find your account. Want to try another or create one?');
        document.location.href = '/signup';
      } else {
      document.location.href = '/';
      }
    }
  };

  const handleFailure = (result) => {
    console.error(result);
  };

  const handleLogin = (data) => {
    const userAddress = address.split(', ');
    const city = userAddress[1];
    const state = userAddress[2].substring(0, userAddress[2].length - 6);
    const zipcode = userAddress[2].substring(userAddress[2].length - 5, userAddress[2].length);

    const userInfo = {
      firstName: data.Du.VX,
      lastName: data.Du.iW,
      username: data.Du.tf,
      profile_img: data.Du.eN,
      email: data.Du.tv,
      network_id: data.Du.FW,
      city: city,
      state: state,
      zip: zipcode,
      privacy: false
    };

    setLoginData(userInfo);
    localStorage.setItem('loginData', JSON.stringify(userInfo));

    axios
      .get(`http://localhost:3001/user/${userInfo.network_id}`)
      .then((res) => {
        document.location.href = '/';
      })
      .catch((err) => {
        axios.post(`${process.env.REACT_APP_SERVER}/user/signup`, userInfo)
          .then(response => {
            console.log('New user signed up');
            document.location.href = '/';
          })
          .catch(err => {
            console.error(err);
          })
      });
  };

  const style = () => {
    let fontStyle = {};
    if (isMobile) {
      fontStyle = {
        variant1: 'h2',
        variant2: 'h3',
        fontSize: 40,
        logoSize: 60,
        linkSize: 33,
        pt: '10%',
        pd: '1%'
      };
    } else {
      fontStyle = {
        variant1: 'h4',
        variant2: 'h5',
        fontSize: 18,
        logoSize: 30,
        linkSize: 18,
        pt: '5%',
        pb: '1%'
      };
    }
    return fontStyle;
  }

  return (
    <div className='w-screen flex-1 h-screen justify-content-center text-2xl bg-ghostWhite'>
      {/* <Button
        variant='contained'
        color='primary'
        onClick={handleResize}
        style={{
          height: style().logoSize,
          fontSize: style().linkSize,
          marginLeft: '75%',
          marginTop: '1%',
          position: 'absolute'
        }}
      >{isMobile ? 'Desktop' : 'Mobile'}</Button> */}
      { isMobile && <img src={require('./image/up.jpg')} alt='up' /> }
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='md' className='w-20'>
          <CssBaseline />
          <Typography
            component='h1'
            variant={ style().variant1 }
            color='secondary'
            fontFamily='Dancing Script'
            align='center'
            pt={style().pt}
            pb={style().pb}
          >
            ADJACENT DOOR
          </Typography>
          <Box
            className='flex items-center mt-5'
            sx={{ flexDirection: 'column' }}
          >
            <RiLoginCircleFill />
            <Typography component='h1' variant={ style().variant2 } >
              Login
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                inputProps={{ style: {fontSize: style().fontSize} }}
                InputLabelProps={{ style: {fontSize: style().fontSize} }}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                inputProps={{ style: {fontSize: style().fontSize} }}
                InputLabelProps={{ style: {fontSize: style().fontSize} }}
              />
              {!fillIn && notice && (
                <Alert className='flex items-center mt-5 font-bold'  severity='error'
                  sx={{ fontSize: style().fontSize }}
                >
                  Please fill out all the required fields
                </Alert>
              )}
              { address ?
                <Button
                  type='submit'
                  fullWidth
                  color='primary'
                  font-color='primary'
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  style={{ fontSize: style().fontSize }}
                >
                  Continue
                </Button>
                :
                <CircularProgress />
              }
              <div className='text-center pt-3'>Or</div>
              <br />
              { address ?
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      style={{
                        backgroundColor: '#FFEEDD',
                        color: '#B8B8FF',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'Roboto',
                        fontWeight: '900',
                        fontSize: style().fontSize,
                        lineHeight: '1.75',
                        padding: '6px 14px',
                        borderRadius: '4px',
                      }}
                    >
                      <FcGoogle
                        size={style().logoSize}
                        style={{ marginRight: 60 }}
                      />
                      <span style={{ marginRight: 40 }}>Log in With Google</span>
                    </button>
                  )}
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                  cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
                :
                <CircularProgress />
              }
              <Grid container sx={{ mt: 3, mb: 10 }}>
                <Grid item>
                  <Link
                    href='/signup'
                    variant='body3'
                    style={{ fontSize: style().linkSize }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      { isMobile ? <img src={require('./image/down.jpg')} alt='down' /> : <img src={require('./image/friend.jpg')} alt='friend' />}
    </div>
  );
}

export default Login;
