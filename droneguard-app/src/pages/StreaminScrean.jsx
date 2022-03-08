import React, { Component }  from 'react';
import ReactDOM  from 'react-dom';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import  { useMousePosition } from '../components/UseMousePosition';

import Spinner from '../components/Spinner'



const StreaminScrean = () => {
  const position = useMousePosition();
  // console.log(`posi`, position.x);
  // console.log(`position`, position.y)
  return <>
    <section className='content'>
      <h1>
        Camera Streaming!
      </h1>
      
        <useMousePosition>
          <div className='square_size'>
          {position.x} {position.y}
          </div>
        </useMousePosition>

    </section>
  </>
};

export default StreaminScrean;
