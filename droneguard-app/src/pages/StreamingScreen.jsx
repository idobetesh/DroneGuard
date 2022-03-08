import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner'

const StreaminScrean = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClickEvent = (event) => {
    console.log(position);

    const { clientX: x, clientY: y } = event;
    setPosition({ x, y });
  };

  return <>
    <section className='content'>
      <h1>
        Camera Streaming!
      </h1>
      <canvas onClick={handleClickEvent} width={700} height={500} style={{backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
        hello
      </canvas>

      {/* <useMousePosition>
          <div className='square_size'>
          {position.x} {position.y}
          </div>
        </useMousePosition> */}

    </section>
  </>
};

export default StreamingScreen;
