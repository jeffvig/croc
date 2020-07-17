import React, { useState } from 'react';
import {useLocalState} from './hooks';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const Zones = () => {
  const [zones, setZones] = useLocalState('Zones');

  return (
    <div>
      <p>
      <Typography>
        {zones}
      </Typography>
      </p>
      <button onClick={() => setZones('1')}>1</button><br />
      <button onClick={() => setZones('2')}>2</button>
      
    </div>
  );
}

export default Zones;