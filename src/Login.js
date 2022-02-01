import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import { RiLoginCircleFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from 'react-google-login';
import theme from './components/muiTheme';

function Login() {
  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem('loginData')
  //     ? JSON.parse(localStorage.getItem('loginData'))
  //     : null
  // );

  const [isMobile, setIsMobile] = useState(false);
  const [notice, setNotice] = useState(false);
  const [fillIn, setFillIn] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  })

  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      username: data.get('username'),
      email: data.get('email')
    };
    console.log(submitData);
    if (!submitData.username || !submitData.email) {
      setNotice(true);
      setFillIn(false);
    } else {
      setNotice(false);
      setFillIn(true);
      document.location.href = '/';
    }
  };

  const handleFailure = (result) => {
    console.error(result);
  };

  const handleLogin = (data) => {
    console.log(data);
    const userInfo = {
      firstName: data.Du.VX,
      lastName: data.Du.iW,
      username: data.Du.tf,
      profile_img: data.Du.eN,
      email: data.Du.tv
    };
    console.log(userInfo);
    // document.location.href = '/';
  };

  // const handleLogin = async (googleData) => {
  //   const res = await fetch('/api/google-login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const data = await res.json();
  //   setLoginData(data);
  //   localStorage.setItem('loginData', JSON.stringify(data));
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('loginData');
  //   setLoginData(null);
  // };

  return (
    <div className='w-screen flex'>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Typography component='h1' variant='h4' color='secondary' align='center' mt='20px'>
            ADJACENT DOOR
          </Typography>
          <Box className='flex items-center mt-5'
              sx={{ flexDirection: 'column' }}
            >
            <RiLoginCircleFill />
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              {(!fillIn && notice) && <Alert className='flex items-center mt-5'
                severity='error'>Please fill out all the required fields
              </Alert> }
              <Button
                type='submit'
                fullWidth
                color='primary'
                font-color='primary'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Continue
              </Button>
              <div className="text-center pt-3">Or</div>
              <br />
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    style={{
                      backgroundColor: '#FFEEDD',
                      color: '#B8B8FF', width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      fontFamily: 'Roboto',
                      fontWeight: '900',
                      fontSize: '1.1rem',
                      lineHeight: '1.75',
                      padding: '6px 14px',
                      borderRadius: '4px'
                    }}
                  >
                  <FcGoogle size='25px' style={{ marginRight: 100, marginLeft: -7 }}/>
                    <span style={{ marginRight: 100 }}>Log in With Google</span>
                  </button>
                )}
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
              <div
                className='fb-login-button'
                data-width='500'
                data-size='large'
                data-button-type='login_with'
                data-layout='default'
                data-auto-logout-link='false' data-use-continue-as='false'
                data-redirecturi='/'
                style={{padding: '10px 0'}}
              ></div>
              <Grid container sx={{mt: 3}}>
                <Grid item>
                  <Link href='/signup' variant='body2'>
                    {'Don\'t have an account? Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
