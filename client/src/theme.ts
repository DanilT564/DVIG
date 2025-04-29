import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066cc', // Синий цвет, как на референсе motors774.netlify.app
      light: '#4d8fe0',
      dark: '#004c99',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f44336', // Красный цвет для акцентов
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#388e3c',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
          boxShadow: 'none',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#004c99',
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#ba000d',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          marginBottom: '1.5rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1280px)': {
            maxWidth: 1200,
          },
        },
      },
    },
  },
});

export default theme; 