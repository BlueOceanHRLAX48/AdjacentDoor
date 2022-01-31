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
import { ThemeProvider } from '@mui/material/styles';
import { RiLoginCircleFill } from 'react-icons/ri';
import { IoIosWarning } from 'react-icons/io';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import theme from './components/muiTheme';

function Login() {
  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem('loginData')
  //     ? JSON.parse(localStorage.getItem('loginData'))
  //     : null
  // );

  const [fillIn, setFillIn] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitData = {
      username: data.get('username'),
      email: data.get('email')
    };
    console.log(submitData);
    if (!submitData.username || !submitData.email) {
      setFillIn(false);
    } else {
      setFillIn(true);
    }
  };

  const handleFailure = (result) => {
    console.error(result);
  };

  const handleLogin = (data) => {
    console.log(data);
  };

  const componentClicked = (data) => {
    console.log(data);
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
              {!fillIn && <div style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'red',
                padding: '5px'
              }}><IoIosWarning size='20px'/>Please fill out all the required fields</div> }
              <Button
                type='submit'
                fullWidth
                color='primary'
                font-color='primary'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                href= {fillIn && '/'}
              >
                Continue
              </Button>
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
              <Grid container sx={{mt: 6}}>
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
