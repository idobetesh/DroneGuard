import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import socket from '../utils/socket';

import droneMovement from '../algorithm/algo.js';

/* Mock values for test button */
const curr = { lat: 32.093128, lon: 34.787805 };
const dest = { lat: 32.093194898476746, lon: 34.78780385430309 };
const xy = { x: 2700, y: 340 };

const sendCommand = (command) => {
  return () => {
    console.log(`Sending the command ${command}`);
    socket.emit('command', command);
  };
};

const sendBulkCommands = (commands) => {
  return () => {
    console.log(`Sending the commands ${JSON.stringify(commands)}`);
    socket.emit('bulkCommands', commands);
  };
};

// We want the calculations & transformation algorithms will take place
// at the control-server, for that we'll send it coordinate & drone height
// as an object: {coordinate, height: h}
const sendPressData = (pressData) => {
  return () => {
    console.log(`Sending pressData ${JSON.stringify(pressData)}`);
    socket.emit('pressData', pressData);
  };
};

const useSocket = () => {
  const [status, updateStatus] = useState('DISCONNECTED');
  useEffect(() => {
    socket.on('status', updateStatus);
    return () => socket.removeListener('status');
  }, []);

  return status;
};

const useDroneState = () => {
  const [droneState, updateDroneState] = useState({});
  useEffect(() => {
    socket.on('dronestate', updateDroneState);
    return () => socket.removeListener('dronestate');
  }, []);

  return droneState;
};

const Navigation = ({ coordinate }) => {
  const status = useSocket();
  const droneState = useDroneState([]);
  const DEFAULT_DISTANCE = 100; //cm

  return (
    <>
      <h3>Manual Navigation - Status is {status}</h3>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('up 200')}
      >
        <span className='symbol'>👍🏼</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand(`down ${DEFAULT_DISTANCE}`)}
      >
        <span className='symbol'>👎🏼</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand(`back ${DEFAULT_DISTANCE}`)}
      >
        <span className='symbol'>↓</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand(`forward ${DEFAULT_DISTANCE}`)}
      >
        <span className='symbol'>↑</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand(`left ${DEFAULT_DISTANCE}`)}
      >
        <span className='symbol'>←</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand(`right ${DEFAULT_DISTANCE}`)}
      >
        <span className='symbol'>→</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('land')}
      >
        <span className='symbol'>LAND</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('takeoff')}
      >
        <span className='symbol'>TAKEOFF</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('cw 90')}
      >
        <span className='symbol'>⟳</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('ccw 90')}
      >
        <span className='symbol'>⟲</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={sendCommand('emergency')}
      >
        <span className='symbol'>Emergency!</span>
      </Button>

      {/* TEST calculations on SERVER side*/}
      <Button
        variant='contained'
        color='primary'
        onClick={sendPressData({ coordinate, height: droneState.h })}
      >
        <span className='symbol'>LG Press 2</span>
      </Button>
    </>
  );
};

export { Navigation, useDroneState, sendBulkCommands };
