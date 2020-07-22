import React, { useState, useEffect } from 'react';
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

const maxLength = (max, p) => p.length > max ? p.length : max

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
const tees = [
              { name: 'Black', length: '369'},
              { name: 'Blue', length: '329'},
              { name: 'White', length: '286'},
              { name: 'Red', length: '256'},
              { name: 'Green', length: '236'},
            ]

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
              {title: 'Crossing to Green', parent: 'false'},
              {title: 'LATERAL', parent: 'false'},
              {title: 'Lateral in LZ1', parent: 'false'},
              {title: 'Lateral in LZ2', parent: 'false'},
              {title: 'Lateral in LZ3', parent: 'false'},
              {title: 'Lateral in LZ4', parent: 'false'},
              {title: 'Lateral in LZ5', parent: 'false'},
              {title: 'Lateral in LZ6', parent: 'false'},
              {title: 'Lateral at Green', parent: 'false'},
              {title: 'TREES', parent: 'false'},
              {title: 'Evaluation', parent: 'false'},
              {title: 'Adjustments', parent: 'false'},
              {title: 'GREEN SURFACE', parent: 'false', allTees: 'true'},
            ]

export default function RatingForm( { _data } ) {
  const classes = useStyles();
  const [data, setData] = useState({})
  const [hole, setHole] = useState(1)

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  const widthPadding = 16
  let cellWidth = 1
  let labelWidth = 1

  const toolbarHeight = 64
  const rowHeightPadding = 22
  let outerGridHeight = 1
  let rowHeight = 1
  let innerGridHeight = 1

  let driveLength = 200
  let subsequentShotLength = 170

  useEffect(() => {
    if (_data.hasOwnProperty('hole')) {
      // console.log('RF - UE - _data: ', _data)
      setData(_data)

      //console.log('tees length: ', _data.hole[_data.currentHole].tee.length)
      cellWidth = Math.floor(((dimensions.width - widthPadding) * .7) / (_data.hole[_data.currentHole].tee.length * 2))
      labelWidth = dimensions.width - widthPadding - (cellWidth * (_data.hole[_data.currentHole].tee.length * 2))

      if (_data.gender === 'M') {
        driveLength = 200
        subsequentShotLength = 170
      } else {
        driveLength = 150
        subsequentShotLength = 130
      }

      const longestTee = _data.hole[_data.currentHole].tee.reduce(maxLength, -Infinity)
      const maxLZs = ( longestTee < driveLength ? 1 : (Math.floor((999 - driveLength) / subsequentShotLength)) + 2 )
      console.log('maxLZs: ', maxLZs)

    //Line height of 23 + (5 * maxLZs)
      outerGridHeight = dimensions.height - toolbarHeight - rowHeightPadding
      rowHeight = ((Math.floor(outerGridHeight / 2)) - 2)
      innerGridHeight = (rowHeight * 2) - rowHeight + 2

    } else {
      //console.log('RF - UE - null _data: ', _data)
    }
  },[_data]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
      //console.log('screen height: ', dimensions.height, 'screen width: ', dimensions.width)
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
  }})

//  return <div>Rendered at {dimensions.width} x {dimensions.height}</div>

  return (
    <Paper elevation={0} style={{width: '100%', height: outerGridHeight, overflowY: 'auto'}} className={classes.paper}>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Tee</Button>
        {tees.map((tee, index) => {
          return (
            <Button style={{width: cellWidth * 2}}>{tees[index].name}</Button>
          );
        })}
      </ButtonGroup>
      <Paper elevation={0} square style={{width: '100%', height: innerGridHeight, overflowY: 'auto'}} >
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{width: labelWidth}}>Length</Button>
        {tees.map((tee, index) => {
          return (
            <Button style={{height: rowHeight, width: cellWidth * 2}}>{tees[index].length}</Button>
          );
        })}
      </ButtonGroup>
      {/*
      <div>dimension.height: {JSON.stringify(dimensions.height)}</div>
      <div>rowHeight: {JSON.stringify(rowHeight)}</div>
      <div>outerGridHeight: {JSON.stringify(outerGridHeight)}</div>
      <div>innerGridHeight: {JSON.stringify(innerGridHeight)}</div>
      <div>dimension.width: {JSON.stringify(dimensions.width)}</div>
      <div>labelWidth: {JSON.stringify(labelWidth)}</div>
      <div>cellWidth: {JSON.stringify(cellWidth)}</div>
      <div>total width: {JSON.stringify(labelWidth + (cellWidth*(tees.length*2)))}</div>
      */}
     </Paper>
    </Paper>
  );
}