import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import Video from '../components/Video';
import Spinner from '../components/Spinner'

const StreamingScreen = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClickEvent = (e) => {
    const { clientX: x, clientY: y } = e;
    setPosition({ x, y });
    console.log(position);
  };

  return <>
    <div className='content'>
      <h1> Camera Streaming! </h1>
      <div onMouseDown={handleClickEvent}>
      <Video/>
      </div>
    </div>
  </>
};

export default StreamingScreen;
