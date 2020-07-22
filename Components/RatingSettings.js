import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
  const [data, setData] = useState({})

  useEffect(() => {
    // console.log('RS - UE(_data) - before - _data: ', _data)
    if (_data.gender !== 'W') {
      _data.gender = 'W'
      _data.team_members = 'Tom, Dick and Harry'
      _data.green_speed = 4
      _data.rought_height = 3

      // console.log('RS - UE(_data) - after - _data: ', _data)
      // setData(prevState => ({
      //   ...prevState, gender: 'M'
      // }))
      setData(_data)
    }
  },[_data]);

  useEffect(() => {
    // console.log('RS - UE(data) - data: ', data)
    //setData(_data)
    onDataChange(data)
  },[data]);

  return (
    <div>Settings</div>
  )
}