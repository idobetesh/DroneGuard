import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addNote } from '../features/records/recordSlice';


const NoteForm = (props) => {
    const [text, setText] = useState(props.note);
    const [id, setRecordId] = useState(props.id);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(addNote({ id, text }));
    };

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Write your note</label>
                    <textarea
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn' type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </section>
    )
};

export default NoteForm;
