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
    _data.gender = 'M'
    setData(_data)
  },[_data]);

  useEffect(() => {
    //setData(_data)
    onDataChange(data)
  },[data]);

  return (
    <div>Settings</div>
  )
}