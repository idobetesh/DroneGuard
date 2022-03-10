import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import socket from '../utils/socket';

function sendCommand(command) {
    return function() {
      console.log(`Sending the command ${command}`);
      socket.emit('command', command);
    };
  }

function useSocket() {
const [status, updateStatus] = useState('DISCONNECTED');
useEffect(() => {
    socket.on('status', updateStatus);
    return () => socket.removeListener('status');
}, []);
return status;
}

function useDroneState() {
    const [droneState, updateDroneState] = useState({});
    useEffect(() => {
      socket.on('dronestate', updateDroneState);
      return () => socket.removeListener('dronestate');
    }, []);
    return droneState;
}

function sendFly(command) {
    let isUp = command ? "land" : "takeoff";
    console.log(`Sending the command ${isUp}`);
    socket.emit('command', isUp);
}

const Navigation = () => {
    const status = useSocket();
    const droneState = useDroneState([]);
    const [isUp, setIsUp] = useState(false);
    
    const handleClickEvent = () => {
        sendFly(isUp);
        setIsUp(!isUp);
    };
    
  return <>
    <h3>Manual Navigation - Status is {status} | Battery is - {droneState.bat}</h3>
    <Button variant="contained" 
            color="primary" 
            style={{"margin-right":"5px"}} 
            onClick={sendCommand("up 30")}>
          <span className="symbol">↑</span>
    </Button>
    <Button variant="contained" 
            color="primary" 
            style={{"margin-right":"5px"}}
            onClick={sendCommand("down 30")}>
          <span className="symbol">↓</span>
    </Button>
    <Button variant="contained" 
            color="primary" 
            style={{"margin-right":"5px"}}
            onClick={sendCommand("left 30")}>
          <span className="symbol">←</span>
    </Button>
    <Button variant="contained" 
            color="primary"
            style={{"margin-right":"5px"}}
            onClick={sendCommand("right 30")}>
          <span className="symbol">→</span>
    </Button>
    <Button variant="contained" 
            color="primary"
            style={{"margin-right":"5px"}}
            onClick={handleClickEvent}>
          LAND/TAKEOFF
    </Button>
    <Button variant="contained" 
            color="primary"
            style={{"margin-right":"5px"}}
            onClick={sendCommand('cw 15')}>
          <span className="symbol">⟳</span>
    </Button>
    <Button variant="contained" 
            color="primary"
            style={{"margin-right":"5px"}}
            onClick={sendCommand('ccw 90')}>
          <span className="symbol">⟲</span>
    </Button>
    <Button variant="contained" 
            color="primary"
            style={{"margin-up":"15px"}}
            onClick={sendCommand('emergency')}>
          <span className="symbol">Emergency!</span>
    </Button>
  </>;
};

export default Navigation;