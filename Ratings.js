import React, { useState } from 'react';
import {useLocalState} from './hooks';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { black, white, grey, green, purple, blue, red } from '@material-ui/core/colors';
import HUE from '@material-ui/core/colors/HUE';
import Typography from '@material-ui/core/Typography';

const themeBlack = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
  typography: {
    fontSize: 4,
  },
});

const themeBlue = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontSize: 4,
  },
});

const themeWhite = createMuiTheme({
  palette: {
    primary: {
      main: '#fafafa',
    },
  },
});

const themeRed = createMuiTheme({
  palette: {
    primary: red,
  },
});

const RatingGrid = () => {

//Tee
//hole length
//green width x depth         ********* All Tees
//Effective Diameter          ********* All Tees
//Roll
//Dogleg / layup
//Topography
//  Approach Elevation
//  Stance in LZ1
//  Stance in LZ2
//  Stance in LZ3
//  Stance in LZ4
//Fairway
//  Landing Zone 1
//  Landing Zone 2
//  Landing Zone 3
//  Landing Zone 4
//Green Target
//  Landing Zone 1
//  Landing Zone 2
//  Landing Zone 3
//  Landing Zone 4
//R & R
//  Adjustments
//  Adjustments at Green
//Bunkers
//  Fairway Bunkers
//  Bunker %                ********* All Tees
//  Adjustments
//Crossing
//  Crossing 1
//  Crossing 2
//  Crossing 3
//  Crossing 4
//Lateral
//  Landing Zone 1
//  Landing Zone 2
//  Landing Zone 3
//  Landing Zone 4
//Trees
//  Evaluation
//  Adjustmenets
//Green Surface             ********* All Tees


  const [ratings, setRatings] = useLocalState('Ratings');
  const theme = useTheme();

  return (
    <div>
      <p>
        <Typography>
          Ratings: {ratings}
        </Typography>
      </p>
      <button variant="contained" color="primary" onClick={() => setRatings('1')}>1</button><br/>
      <button color={theme.secondary} onClick={() => setRatings('2')}>2</button><br/>
      <button onClick={() => setRatings('3')}>3</button><br/>
      <ThemeProvider theme={themeBlack}><Button variant="contained" size="small" color="primary">Black</Button></ThemeProvider>
      <ThemeProvider theme={themeBlue}><Button variant="contained" size="small" color="primary">Blue</Button></ThemeProvider>
      <ThemeProvider theme={themeWhite}><Button variant="contained" size="small" color="primary">White</Button></ThemeProvider>
      <ThemeProvider theme={themeRed}><Button variant="contained" size="small" color="primary">Red</Button></ThemeProvider>
    </div>
  );
}

export default RatingGrid;