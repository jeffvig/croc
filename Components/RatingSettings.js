import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as constants from '../constants';

const useStyles = makeStyles((theme) => ({
  titleItemRight: {
    color: "black",
    backgroundColor: "white",
    height: 60,
    float: "right",
  }
}))

export default function RatingSettings( { _data, onDataChange } ) {
  const classes = useStyles();
  const [gender, setGender] = React.useState('');
  const [speed, setSpeed] = React.useState('');
  const [grassType, setGrassType] = React.useState('C');
  const [roughHeight, setRoughHeight] = React.useState('');
  const [hole, setHole] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [tees, setTees] = useState(['black'])
  const [data, setData] = useState({})

  useEffect(() => {
    if (_data.hasOwnProperty('hole')) {
     //console.log('RS - UE(_data) - before - _data: ', _data)
      if (_data.gender !== 'MEN') {
        _data.gender = 'MEN'
        _data.team_members = 'Tom, Dick and Harry'
        _data.green_speed = 4
        _data.rought_height = 3
        for (let hole = 1; hole < 19; hole++) {
          for (let tee = 0; tee < _data.hole[hole].tee.length; tee++) {
            _data.hole[hole].tee[tee].SCR.green_target[0] = (_data.hole[hole].tee[tee].length < constants.shot_length[_data.gender]['SCR']['DRV'] ? 0 : _data.hole[hole].tee[tee].length - constants.shot_length[_data.gender]['SCR']['DRV'])
            for (let lz = 1; lz < 10; lz++) {
              _data.hole[hole].tee[tee].SCR.green_target[lz] = (_data.hole[hole].tee[tee].SCR.green_target[(lz-1)] < constants.shot_length[_data.gender]['SCR']['NXT'] ? 0 : _data.hole[hole].tee[tee].SCR.green_target[(lz-1)] - constants.shot_length[_data.gender]['SCR']['NXT'])
              if (_data.hole[hole].tee[tee].SCR.green_target[lz] === 0) lz=10   //No more - get out
            }

            _data.hole[hole].tee[tee].BGY.green_target[0] = (_data.hole[hole].tee[tee].length < constants.shot_length[_data.gender]['BGY']['DRV'] ? 0 : _data.hole[hole].tee[tee].length - constants.shot_length[_data.gender]['BGY']['DRV'])
            for (let lz = 1; lz < 10; lz++) {
              _data.hole[hole].tee[tee].BGY.green_target[lz] = (_data.hole[hole].tee[tee].BGY.green_target[(lz-1)] < constants.shot_length[_data.gender]['BGY']['NXT'] ? 0 : _data.hole[hole].tee[tee].BGY.green_target[(lz-1)] - constants.shot_length[_data.gender]['BGY']['NXT'])
              if (_data.hole[hole].tee[tee].BGY.green_target[lz] === 0) lz=10   //No more - get out
            }
          }
        }

        // console.log('RS - UE(_data) - after - _data: ', _data)
        // setData(prevState => ({
        //   ...prevState, gender: 'M'
        // }))
        setData(_data)
      }
    }
  },[_data]);

  useEffect(() => {
    // console.log('RS - UE(data) - data: ', data)
    //setData(_data)
    onDataChange(data)
  },[data]);

  const handleGenderChange = (event) => {
      setGender(event.target.value)
      setRoughHeight('')
  };

  const handleSpeedChange = (event) => {
      setSpeed(event.target.value)
  };

  const handleGrassTypeChange = (event) => {
      setGrassType(event.target.value)
      setRoughHeight('')
  };

  const handleRoughHeightChange = (event) => {
      setRoughHeight(event.target.value)
  }

  const handleHoleAssignedChange = (event) => {
    //setHoleAssigned(true)
    console.log('event: ', event)
  }

  const addTee = (event) => {
    setTees((prev) => ([...prev, 'new name']))
  }

  return (
    <Grid
        container
        direction="row"
        justify="space-between"
        spacing={1}
    >
      <Grid item xs={12}>
        <Typography 
          variant="h4"
          gutterBottom
          align='center'
        >
          Course and Hole Settings
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <hr style={{ color: '#000000', backgroundColor: '#000000', height: .5, borderColor : '#000000' }} />
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Gender</FormLabel>
          <RadioGroup name="gender1" value={gender} onChange={handleGenderChange}>
            <FormControlLabel value="M" control={<Radio />} label="Men" />
            <FormControlLabel value="W" control={<Radio />} label="Women" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Grass Type</FormLabel>
          <RadioGroup name="grassType1" value={grassType} onChange={handleGrassTypeChange}>
            <FormControlLabel value="C" control={<Radio />} label="Cool Season Grass" />
            <FormControlLabel value="W" control={<Radio />} label="Warm Season Grass" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <hr style={{ color: '#000000', backgroundColor: '#000000', height: .5, borderColor : '#000000' }} />
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Green Speed</FormLabel>
          <RadioGroup name="speed1" value={speed} onChange={handleSpeedChange}>
            <FormControlLabel value="6" control={<Radio />} label="6&apos;11&quot; or Less" />
            <FormControlLabel value="7" control={<Radio />} label="7&apos; to 8&apos;5&quot;" />
            <FormControlLabel value="8" control={<Radio />} label="8&apos;6&quot; to 9&apos;11&quot;" />
            <FormControlLabel value="10" control={<Radio />} label="10&apos; to 10&apos;11&quot;" />
            <FormControlLabel value="11" control={<Radio />} label="11&apos; to 11&apos;11&quot;" />
            <FormControlLabel value="12" control={<Radio />} label="12&apos; or More" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6} hidden={gender === '' || grassType ==='' ? false : true} >
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Average Rought Height of Hole (in Inches)</FormLabel>
          <div style={{marginTop: 100}}>Both Gender and Grass Type must be selected</div>
        </FormControl>
      </Grid>
      <Grid item xs={6} hidden={gender === 'M' && grassType ==='C' ? false : true} >
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Average Rought Height of Hole (in Inches)</FormLabel>
          <RadioGroup name="speed1" value={roughHeight} onChange={handleRoughHeightChange}>
            <FormControlLabel value="1" control={<Radio />} label="< 2&quot;" />
            <FormControlLabel value="2" control={<Radio />} label="2&quot; to 3&quot;" />
            <FormControlLabel value="3" control={<Radio />} label="3&quot; to 4&quot;" />
            <FormControlLabel value="4" control={<Radio />} label="4&quot; to 5&quot;" />
            <FormControlLabel value="5" control={<Radio />} label="> 6&quot;" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6} hidden={gender === 'M' && grassType ==='W' ? false : true} >
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Average Rought Height of Hole (in Inches)</FormLabel>
          <RadioGroup name="speed1" value={roughHeight} onChange={handleRoughHeightChange}>
            <FormControlLabel value="1" control={<Radio />} label="< 1&quot;" />
            <FormControlLabel value="2" control={<Radio />} label="1&quot; to 2&quot;" />
            <FormControlLabel value="3" control={<Radio />} label="2&quot; to 3&quot;" />
            <FormControlLabel value="4" control={<Radio />} label="3&quot; to 4&quot;" />
            <FormControlLabel value="5" control={<Radio />} label="> 4&quot;" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6} hidden={gender === 'W' && grassType ==='C' ? false : true} >
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Average Rought Height of Hole (in Inches)</FormLabel>
          <RadioGroup name="speed1" value={roughHeight} onChange={handleRoughHeightChange}>
            <FormControlLabel value="1" control={<Radio />} label="< 2&quot;" />
            <FormControlLabel value="2" control={<Radio />} label="2&quot; to 2.5&quot;" />
            <FormControlLabel value="3" control={<Radio />} label="2.5&quot; to 3.5&quot;" />
            <FormControlLabel value="4" control={<Radio />} label="3.5&quot; to 5&quot;" />
            <FormControlLabel value="5" control={<Radio />} label="> 5&quot;" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6} hidden={gender === 'W' && grassType ==='W' ? false : true} >
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{padding: '10px'}}>Average Rought Height of Hole (in Inches)</FormLabel>
          <RadioGroup name="speed1" value={roughHeight} onChange={handleRoughHeightChange}>
            <FormControlLabel value="1" control={<Radio />} label="< 1&quot;" />
            <FormControlLabel value="2" control={<Radio />} label="1&quot; to 1.5&quot;" />
            <FormControlLabel value="3" control={<Radio />} label="1.5&quot; to 2&quot;" />
            <FormControlLabel value="4" control={<Radio />} label="2&quot; to 3&quot;" />
            <FormControlLabel value="5" control={<Radio />} label="> 3&quot;" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <hr style={{ color: '#000000', backgroundColor: '#000000', height: .5, borderColor : '#000000' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography 
          variant="h4"
          gutterBottom
          align='center'
        >
          Hole / Tee Distances
        </Typography>
        <Button variant='contained' onClick={addTee}>Add Tee</Button>
        {hole.map((value, hole) => {return(
            <div>Hole #{hole+1}</div>
            {
              tees.map((name, index) => {return(
                <Button>{name}</Button>
              )
            )}}
        )})}
      </Grid>
      <Grid item xs={12}>
        <hr style={{ color: '#000000', backgroundColor: '#000000', height: .5, borderColor : '#000000' }} />
      </Grid>
    </Grid>
  )
}