import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import socket from '../utils/socket';
import Video from '../components/Video';
import { Navigation } from '../components/Navigation';
import { sleep } from '../utils/utils';
const log = (args) => console.log(args);

const useDroneState = () => {
  const [droneState, updateDroneState] = useState({});
  useEffect(() => {
    socket.on('dronestate', updateDroneState);
    return () => socket.removeListener('dronestate');
  }, []);

  return droneState;
};

const StreamingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

  }, [user, navigate, dispatch]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [FormHasError, setFormHasError] = useState(false);
  const [cursorStyle, setCursorStyle] = useState({position:'relative',width:'0px', height:'0px'});
  const [navigating, setNavigating] = useState(false);

  const handleClickEvent = async (e) => {
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    const cursorStyle = {position:'relative', 
                        left:e.nativeEvent.offsetX, 
                        top:e.nativeEvent.offsetY, 
                        backgroundColor: 'Red',
                        width:'20px', 
                        height:'20px',
                        marginTop: '1%',
                        marginLeft: '1%',
                        borderRadius: '10px'};
    setCursorStyle(cursorStyle);
    await sleep(2000);
    setCursorStyle({position:'relative',width:'0px', height:'0px'});
    if (FormHasError) return;
  };

  useEffect(() => {
    const hasErrors = Object.keys(position).filter(
      (key) => position[key].error
    );
    if (!hasErrors.length) {
      setFormHasError(() => true);
    }

    if ( !navigating ) {
      console.log(`Sending pressData ${JSON.stringify({position: {position}, height: droneState.h })}`);
      setNavigating(true);
      socket.emit('pressData',{position: position, height: droneState.h });
    }
  }, [position]);

  useEffect(() => {
    if(navigating){
      const sleeping = async () => {
        await sleep(10000);
        setNavigating(false);
      };
      sleeping();
    }
  }, [navigating]);

  const droneState = useDroneState([]);
  return (
    <>
      <div className='content'>
        <h1> Drone Navigation </h1>
        <div
          className='container'
          onClick={(e) => {
            handleClickEvent(e);
          }}
        >
        <div className='cursor' style={cursorStyle}></div>
          <div>
            <div className='drone_info'>
              <h3>Battery: {droneState.bat}%</h3>
              <h3>YAW: {droneState.yaw}</h3>
              <h3>height: {droneState.h} cm</h3>
            </div>
          </div>
          <Video />
        </div>
      </div>
      <Navigation coordinate={position} />
    </>
  );
};

export default StreamingScreen;
