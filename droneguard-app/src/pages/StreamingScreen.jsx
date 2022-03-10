import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Video from '../components/Video';

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
      <Navigation/>
      </div>
    </div>
  </>
};

export default StreamingScreen;
