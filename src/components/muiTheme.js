import { createTheme } from '@mui/material/styles';

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

export default theme;