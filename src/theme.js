import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Custom primary color
        },
        secondary: {
            main: '#f50057', // Custom secondary color
        },
    },
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
        },
    },
});

export default theme;
