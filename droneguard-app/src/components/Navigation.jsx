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

const sendSpecial = (commands) => {
  return () => {
    console.log(`Sending the commands ${JSON.stringify(commands)}`);
    socket.emit('special', commands);
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
        onClick={sendCommand('down 30')}
      >
        <span className='symbol'>👎🏼</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('back 30')}
      >
        <span className='symbol'>↓</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('forward 30')}
      >
        <span className='symbol'>↑</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('left 30')}
      >
        <span className='symbol'>←</span>
      </Button>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: '5px' }}
        onClick={sendCommand('right 30')}
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

      {/* TEST */}
      <Button
        variant='contained'
        color='primary'
        onClick={sendSpecial(droneMovement(coordinate, droneState.h))}
      >
        <span className='symbol'>LG Press</span>
      </Button>
    </>
  );
};

export { Navigation, useDroneState, sendSpecial };
