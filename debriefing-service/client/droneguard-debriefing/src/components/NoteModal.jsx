import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useState } from 'react';

import NoteForm from './NoteForm';

const VerticallyCenteredModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <NoteForm id={props.id} note={props.note}/>
                <Button className='btn-reverse' onClick={props.onHide} style={{display:'flex'}}>
                    X
                </Button>
        </Modal>
    );
};

const NoteModal = (props) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button className='btn' style={{padding: '5px 10px', marginLeft: '2%'}} 
            onClick={() => setModalShow(true)}>
                <FaRegCommentAlt />
            </Button>

            <VerticallyCenteredModal
                show={modalShow}
                note={props.record.note}
                id={props.record._id}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default NoteModal;