import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getBeaches, reset } from '../features/beaches/beachSlice';
import Api from '../api/api-requests';
import Spinner from '../components/Spinner';

const BeachesModal = (props) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { beaches, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.beaches
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getBeaches());
    console.log(beaches);
  }, [user, isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Modal
      {...props}
      size=''
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <h4>Choose your beach</h4>
        <ul style={{ justifyContent: 'center' }}>
          {beaches.map((beach) => (
            // key={beach._id}
            <li>
              {beach.name} | {beach.city}{' '}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <button onClick={props.onHide}>Submit</button>
    </Modal>
  );
};

export default BeachesModal;
