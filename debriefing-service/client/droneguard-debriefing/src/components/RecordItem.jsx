import { useSelector } from 'react-redux'
import { FaTrashAlt, FaRegCommentAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteRecord, addComment } from '../features/records/recordSlice';

import defaultThumbnail from '../assets/defaultThumbnail.png'

const RecordItem = ({ record }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className='record'>
            <div>{new Date(record.createdAt).toLocaleString('en-GB')}</div>
            {record.thumbnailUrl ? (
                <img onClick={() => console.log('clicked!')} src={record.thumbnailUrl} alt={'record.thumbnailUrl'} />
            ) : (
                <img onClick={() => console.log('clicked!')} src={defaultThumbnail} alt={'defaultThumbnail'}/>
            )}
            {user.userType === 'Admin' && (
                <button className='close'
                    onClick={() => dispatch(deleteRecord(record._id))}>
                    <FaTrashAlt />
                </button>
            )}
            <button className='close' style={{ marginRight: '7%', marginTop: '.2%' }}
                onClick={() => dispatch(addComment({id: record._id, comment: 'hi'}))}>
                <FaRegCommentAlt />
            </button>
        </div>
    )
};

export default RecordItem;
