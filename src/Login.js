import React, {useState} from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RiLoginCircleFill } from 'react-icons/ri';
import GoogleLogin from 'react-google-login';

function Login() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email')
    });
  };

  const handleFailure = (result) => {
    console.error(result);
  };

  const handleLogin = (googleData) => {
    console.log(googleData);
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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#B8B8FF',
        contrastText: "#fff"
      },
      secondary: {
        main: '#9381FF',
      },
      ghostWhite: {
        main: '#F8F8FF',
      },
      antiqueWhite: {
        main: '#FFEEDD',
      },
      silk: {
        main: '#FFD8BE',
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Typography component='h1' variant='h4' color='secondary' align='center' mt='20px'>
            ADJACENT DOOR
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <RiLoginCircleFill />
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='dense'
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
              autoComplete='firstName'
              autoFocus
            />
            <TextField
              margin='dense'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='lastName'
              autoFocus
            />
            <TextField
              margin='dense'
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
            {/* <Button fullWidth> */}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    style={{
                      backgroundColor: '#F8F8FF',
                      color: 'black', width: '100%',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      lineHeight: '1.75',
                      padding: '6px 16px',
                      borderRadius: '4px'
                    }}
                  >
                  LOGIN WITH
                  <span style={{color: '#FF0000'}}> G</span>
                  <span style={{color: '#66CC66'}}>O</span>
                  <span style={{color: '#FF9966'}}>O</span>
                  <span style={{color: '#480ca8'}}>G</span>
                  <span style={{color: '#FF0066'}}>L</span>
                  <span style={{color: '#e76f51'}}>E</span>
                  </button>
                )}
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
            {/* </Button> */}
            <Grid container>
              <Grid item>
                <Link href='#' variant='body2'>
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
