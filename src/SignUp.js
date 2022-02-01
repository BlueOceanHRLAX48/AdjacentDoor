import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
    });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#B8B8FF',
        contrastText: '#fff',
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
      },
    },
  });

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
            <Box
              sx={{
                my: 10,
                mx: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
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
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='dense'
                  fullWidth
                  id='firstName'
                  label='First Name'
                  name='firstName'
                  autoComplete='firstName'
                  autoFocus
                />
                <TextField
                  margin='dense'
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
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
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
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  href='/signup/location'
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
