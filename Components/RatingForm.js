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
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
  }})

//  return <div>Rendered at {dimensions.width} x {dimensions.height}</div>

  const labelWidth = dimensions.width * .39
  let cellWidth = dimensions.width * .07
  cellWidth -= 1
  return (
    <div>
      <p>
      <Typography>
      Width: {dimensions.width}px
      </Typography>
      <Typography>
      Height: {dimensions.height}px
      </Typography>
      </p>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth}}>Tee</Button>
        <Button style={{width: cellWidth * 2}}>Black</Button>
        <Button style={{width: cellWidth * 2}}>Blue</Button>
        <Button style={{width: cellWidth * 2}}>Green</Button>
        <Button style={{width: cellWidth * 2}}>Red</Button>
      </ButtonGroup>
      <Paper elevation={0} square style={{height: '200px', overflowY: 'auto'}} >
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
    </div>
  );
}