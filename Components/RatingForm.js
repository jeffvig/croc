import React, { useState } from 'react';
import {useLocalState} from './hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useWindowSize from '../WindowSizeHook'

const useStyles = makeStyles((theme) => ({
  titleItemRight: {
    color: "black",
    backgroundColor: "white",
    height: 60,
    float: "right",
  }
}))

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

const row = [
              {title: 'Length', parent: 'false'},
              {title: 'Width x Depth', parent: 'false', allTees: 'true'},
              {title: 'Eff. Diameter',parent: 'false', allTees: 'true'},
              {title: 'Roll', parent: 'false'},
              {title: 'Dogleg / Layup',parent: 'false'},
              {title: 'TOPOGRAPHY', parent: 'false'},
              {title: 'Elevation +/-',parent: 'false'},
              {title: 'Stance', parent: 'false'},
              {title: 'Stance in LZ1', parent: 'false'},
              {title: 'Stance in LZ2', parent: 'false'},
              {title: 'Stance in LZ3', parent: 'false'},
              {title: 'Stance in LZ4', parent: 'false'},
              {title: 'Stance in LZ5', parent: 'false'},
              {title: 'Stance in LZ6', parent: 'false'},
              {title: 'FAIRWAY', parent: 'false'},
              {title: 'Width in LZ1', parent: 'false'},
              {title: 'Width in LZ2', parent: 'false'},
              {title: 'Width in LZ3', parent: 'false'},
              {title: 'Width in LZ4', parent: 'false'},
              {title: 'Width in LZ5', parent: 'false'},
              {title: 'Width in LZ6', parent: 'false'},
              {title: 'GREEN TARGET', parent: 'false'},
              {title: '1st Landing Zone', parent: 'false'},
              {title: '2nd Landing Zone', parent: 'false'},
              {title: '3rd Landing Zone', parent: 'false'},
              {title: '4th Landing Zone', parent: 'false'},
              {title: '5th Landing Zone', parent: 'false'},
              {title: '6th Landing Zone', parent: 'false'},
              {title: 'R & R', parent: 'false'},
              {title: 'Adjustments', parent: 'false'},
              {title: 'Adjs at Green', parent: 'false'},
              {title: 'BUNKERS', parent: 'false'},
              {title: 'Bunker %', parent: 'false', allTees: 'true'},
              {title: 'Adjustments', parent: 'false'},
              {title: 'CROSSING', parent: 'false'},
              {title: 'Crossing in LZ1', parent: 'false'},
              {title: 'Crossing in LZ2', parent: 'false'},
              {title: 'Crossing in LZ3', parent: 'false'},
              {title: 'Crossing in LZ4', parent: 'false'},
              {title: 'Crossing in LZ5', parent: 'false'},
              {title: 'Crossing in LZ6', parent: 'false'},
              {title: 'LATERAL', parent: 'false'},
              {title: 'Lateral in LZ1', parent: 'false'},
              {title: 'Lateral in LZ2', parent: 'false'},
              {title: 'Lateral in LZ3', parent: 'false'},
              {title: 'Lateral in LZ4', parent: 'false'},
              {title: 'Lateral in LZ5', parent: 'false'},
              {title: 'Lateral in LZ6', parent: 'false'},
              {title: 'TREES', parent: 'false'},
              {title: 'Evaluation', parent: 'false'},
              {title: 'Adjustments', parent: 'false'},
              {title: 'GREEN SURFACE', parent: 'false'},
              {title: 'Lateral in LZ4', parent: 'false'},
              {title: 'Lateral in LZ5', parent: 'false'},
              {title: 'Lateral in LZ6', parent: 'false', allTees: 'true'},
            ]

export default function RatingForm() {
  const classes = useStyles();

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
      console.log('screen height: ', dimensions.height, 'screen width: ', dimensions.width)
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
  }})

//  return <div>Rendered at {dimensions.width} x {dimensions.height}</div>

  const toolbarHeight = 64
  const widthPadding = 16
  const labelWidth = dimensions.width * .39
  let cellWidth = dimensions.width * .07
  cellWidth -= 1

  return (
    <Paper elevation={0} style={{height: '800px', overflowY: 'auto'}} className={classes.paper}>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth}}>Tee</Button>
        <Button style={{width: cellWidth * 2}}>Black</Button>
        <Button style={{width: cellWidth * 2}}>Blue</Button>
        <Button style={{width: cellWidth * 2}}>Green</Button>
        <Button style={{width: cellWidth * 2}}>Red</Button>
      </ButtonGroup>
      <Paper square style={{height: '700px', overflowY: 'auto'}} >
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}><Typography float='right' variant='caption'>Length</Typography></Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth, marginRight: '1px'}}>Tee</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
        <Button style={{width: cellWidth}}>&nbsp;</Button>
      </ButtonGroup>
      </Paper>
    </Paper>
  );
}