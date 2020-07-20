import React, { useState } from 'react';
import { render } from 'react-dom';
import './style.css';
import {useLocalState} from './hooks';
import Zones from './Zones';
import Ratings from './Ratings';
import RatingForm from './Components/RatingForm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import theme from './theme';    

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
      marginBottom: '4px'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'linear-gradient(45deg, #4caf50 30%, #a5d6a7 90%)',
    height: '418px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  settingsButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary.main,
//       main: '#4caf50',
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       light: '#0066ff',
//       main: '#0044ff',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#ffcc00',
//     },
//     // Used by `getContrastText()` to maximize the contrast between
//     // the background and the text.
//     contrastThreshold: 3,
//     // Used by the functions below to shift a color's luminance by approximately
//     // two indexes within its tonal palette.
//     // E.g., shift from Red 500 to Red 300 or Red 700.
//     tonalOffset: 0.2,
//   },  
//   spacing: factor => [0, 4, 8, 16, 32, 64][factor],
//   typography: {
//     fontSize: 12,
//   },
// });

const hole_info = {
  green_width: 0,
  green_depth: 0,
  green_shape: '',
  green_eff_diameter: 0,
}

const data = {
  team_members: '',
  green_speed: '',
  rought_height: '',
  gender: '',
  hole: [
    {
      tee: [
        {
          name: '',
          length: '',
          scratch: {
          },
          bogey: {
          }
        }
      ]
    }
  ]
}
const App = () => {

  const [fruit, setFruit] = useLocalState('Fruit');
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit">
              <MenuIcon />
            </IconButton>
            <Button
              variant='outlined'
                style={{maxWidth: '45px', maxHeight: '45px', minWidth: '45px', minHeight: '45px', fontSize: '40px', marginRight: '40px'}}
                onClick={() => setHole(hole === 1 ? 18 : hole - 1)}
            >
              &lt;
            </Button>
            <Typography variant="h6" className={classes.title}>
              Hole #1
            </Typography>
            <Button
              variant='outlined'
                style={{maxWidth: '45px', maxHeight: '45px', minWidth: '45px', minHeight: '45px', fontSize: '40px', marginRight: '40px'}}
                onClick={() => setHole(hole === 1 ? 18 : hole - 1)}
            >
              &gt;
            </Button>
            <Typography variant="h6" className={classes.title}>
              Par 4
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Men's Tees
            </Typography>
            <IconButton edge="end" className={classes.settingsButton} color="inherit">
              <AssignmentIcon />
            </IconButton>
            <IconButton edge="end" className={classes.settingsButton} color="inherit">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>      
      <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
      >
        <Grid item xs={12 }>
            <RatingForm />
        </Grid>
      </Grid>
        <Grid item xs={2} hidden={true}>
            <Zones />
        </Grid>
        <Grid item xs={10} hidden={true}>
            <Ratings />
        </Grid>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById('root'));
