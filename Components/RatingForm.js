import React, { useState } from 'react';
import {useLocalState} from './hooks';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useWindowSize from '../WindowSizeHook'
export default function RatingForm() {

  const size = useWindowSize();

  return (
    <div>
      <p>
      <Typography>
      </Typography>
      </p>
      <button onClick={() => setZones('1')}>1</button><br />
      <button onClick={() => setZones('2')}>2</button>
      
      <ButtonGroup color="black">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Width: {size.width}px</Button>
        <Button>Height: {size.height}px</Button>
      </ButtonGroup>

    </div>
  );
}