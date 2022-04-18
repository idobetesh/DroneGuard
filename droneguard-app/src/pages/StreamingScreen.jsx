import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import socket from '../utils/socket';
import Video from '../components/Video';
import { Navigation } from '../components/Navigation';
import BeachesModal from '../components/BeachesModal';
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

  const handleClickEvent = (e) => {
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    if (FormHasError) return;
  };

  useEffect(() => {
    const hasErrors = Object.keys(position).filter(
      (key) => position[key].error
    );
    if (!hasErrors.length) {
      setFormHasError(() => true);
    }
    console.log(`position`, position);
  }, [position]);

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
