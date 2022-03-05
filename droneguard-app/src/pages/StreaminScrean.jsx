import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner'

const StreaminScrean = () => {
  return <>
    <section className='content'>
      <h1>
        Camera Streaming!
      </h1>
    </section>
  </>
};

export default StreaminScrean;
