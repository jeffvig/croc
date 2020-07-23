import React, { useState, useEffect, Fragment } from 'react';
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
  },
  inputbutton: {
    borderWidth: '1px', 
    borderStyle: 'solid', 
    borderColor: 'black',
    minWidth: '1px',    
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
  const [cellWidth, setCellWidth] = useState(1)
  const [labelWidth, setLabelWidth] = useState(1)
  const [outerGridHeight, setOuterGridHeight] = useState(1)
  const [rowHeight, setRowHeight] = useState(1)
  const [innerGridHeight, setInnerGridHeight] = useState(1)
  const [numberOfRows, setNumberOfRows] = useState(1)
  const [maxLZs, setMaxLZs] = useState(1)

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  const widthPadding = 16
  const toolbarHeight = 64
  const rowHeightPadding = 22
  let longestTee = 0
  let driveLength = 200
  let subsequentShotLength = 170

  const calculateDimensions = (_data, height, width) => {
    //console.log('calculateDimensions', height, width, _data)

    //console.log('tees length: ', _data.hole[_data.currentHole].tee.length)
    const _cellWidth = Math.floor(((width - widthPadding) * .7) / (_data.hole[_data.currentHole].tee.length * 2))
    setCellWidth(_cellWidth)
    const _labelWidth = width - widthPadding - (_cellWidth * (_data.hole[_data.currentHole].tee.length * 2))
    setLabelWidth(_labelWidth)

    if (_data.gender === 'M') {
      driveLength = 200
      subsequentShotLength = 170
    } else {
      driveLength = 150
      subsequentShotLength = 130
    }

    longestTee = _data.hole[_data.currentHole].tee.reduce(maxLength, -Infinity)
    const _maxLZs = ( longestTee < driveLength ? 0 : (Math.floor((longestTee - driveLength) / subsequentShotLength)) + 1 )
    setMaxLZs(_maxLZs)
    const _numberOfRows = (24 + (6 * _maxLZs))
    setNumberOfRows(_numberOfRows)

    const _outerGridHeight = height - toolbarHeight - rowHeightPadding
    setOuterGridHeight(_outerGridHeight)
    const _rowHeight = ((Math.floor(_outerGridHeight / _numberOfRows)) - 2)
    setRowHeight(_rowHeight)
    setInnerGridHeight((_rowHeight * _numberOfRows) - _rowHeight + 2)

    console.log('maxLZs: ', maxLZs)
    // console.log('height: ', height)
    // console.log('width: ', width)
    // console.log('numberOfRows: ', numberOfRows)
    // console.log('outerGridHeight: ', outerGridHeight)
    // console.log('rowHeight: ', rowHeight)
    // console.log('innerGridHeight: ', innerGridHeight)
  }

  useEffect(() => {
    if (_data.hasOwnProperty('hole')) {
      // console.log('RF - UE - _data: ', _data)
      setData(_data)
      calculateDimensions(_data, dimensions.height,  dimensions.width)

    } else {
      console.log('RF - UE - null _data: ', _data)
    }
  },[_data]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
      calculateDimensions(_data, window.innerHeight, window.innerWidth)
      //console.log('screen height: ', dimensions.height, 'screen width: ', dimensions.width)
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
  }})

//  return <div>Rendered at {dimensions.width} x {dimensions.height}</div>

  if (!data.hasOwnProperty('hole')) return (<div>Rendered at {dimensions.width} x {dimensions.height}</div>)

  return (
    <Paper elevation={0} style={{width: '100%', height: outerGridHeight, overflowY: 'auto'}} className={classes.paper}>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Tee</Button>
        {tees.map((tee, index) => {
          return (
            <Button style={{height: rowHeight, width: cellWidth * 2}}>{data.hole[data.currentHole].tee[index].name}</Button>
          );
        })}
      </ButtonGroup>
      <Paper elevation={0} square style={{width: '100%', height: innerGridHeight, overflowY: 'auto'}} >
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Length</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth * 2}}>{data.hole[data.currentHole].tee[index].length}</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Width x Depth</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth * 2}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Eff. Diameter</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth * 2}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Roll</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Dogleg / Layup</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>TOPOGRAPHY</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Approach Elevation</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Stance</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      {maxLZs > 0 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Stance in LZ1</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 1 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Stance in LZ2</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 2 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Stance in LZ3</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 3 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Stance in LZ4</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 4 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Stance in LZ5</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 5 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Stance in LZ6</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 6 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Stance in LZ7</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>FAIRWAY</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      {maxLZs > 0 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Fairway in LZ1</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 1 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Fairway in LZ2</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 2 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Fairway in LZ3</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 3 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Fairway in LZ4</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 4 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Fairway in LZ5</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 5 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Fairway in LZ6</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 6 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Fairway in LZ7</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>GREEN TARGET</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      {maxLZs > 0 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Landing Zone 1</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 1 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Landing Zone 2</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 2 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Landing Zone 3</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 3 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Landing Zone 4</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 4 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Landing Zone 5</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 5 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Landing Zone 6</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 6 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Landing Zone 7</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
       <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>R & R</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
       <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Adjustments</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
       <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Adjs at Green</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>BUNKERS</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      {maxLZs > 0 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Bunker in LZ1</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 1 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Bunker in LZ2</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 2 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Bunker in LZ3</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 3 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Bunker in LZ4</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 4 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Bunker in LZ5</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 5 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Bunker in LZ6</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 6 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Bunker in LZ7</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Bunker %</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth * 2}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Adjustments</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>CROSSING</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      {maxLZs > 0 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Crossing to LZ1</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 1 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Crossing to LZ2</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 2 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Crossing to LZ3</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 3 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Crossing to LZ4</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 4 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Crossing to LZ5</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 5 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Crossing to LZ6</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 6 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Crossing to LZ7</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Crossing to Green</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>LATERAL</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      {maxLZs > 0 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Lateral at LZ1</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 1 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Lateral at LZ2</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 2 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Lateral at LZ3</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 3 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Lateral at LZ4</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 4 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Lateral at LZ5</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 5 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Lateral at LZ6</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      {maxLZs > 6 &&
        <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
          <Button style={{height: rowHeight, width: labelWidth}}>Lateral at LZ7</Button>
          {tees.map((tee, index) => {
            return (
              <Fragment>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
                <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              </Fragment>
            );
          })}
        </ButtonGroup>
      }
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Lateral at Green</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>TREES</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Evaluation</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>Adjustments</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
          );
        })}
      </ButtonGroup>
      <ButtonGroup color="black" variant="contained" style={{marginBottom: '1px'}}>
        <Button style={{height: rowHeight, width: labelWidth}}>GREEN SURFACE</Button>
        {tees.map((tee, index) => {
          return (
            <Fragment>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
              <Button className={classes.inputbutton} style={{height: rowHeight, width: cellWidth}}>&nbsp;</Button>
            </Fragment>
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