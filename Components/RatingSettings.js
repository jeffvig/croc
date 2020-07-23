import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

  return (
    <div>Settings</div>
  )
}