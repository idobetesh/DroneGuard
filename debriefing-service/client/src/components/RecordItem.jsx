import { useSelector } from 'react-redux'
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteRecord } from '../features/records/recordSlice';

import defaultThumbnail from '../assets/defaultThumbnail.png'
import NoteModal from '../components/NoteModal';

const RecordItem = ({ record }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className='record'>
            <div>{new Date(record.createdAt).toLocaleString('en-GB')}</div>
            <div>{(record.beach)} Beach</div>
            {record.thumbnailUrl ? (
                <a href={record.url} target='_blank' rel='noreferrer'>
                    <img src={record.thumbnailUrl} alt={'record.thumbnailUrl'} />
                </a>
            ) : (
                <a href={record.url} target='_blank' rel='noreferrer'>
                    <img src={defaultThumbnail} alt={'defaultThumbnail'} />
                </a>
            )}
            {user.userType === 'Admin' && (
                <button className='close'
                    onClick={() => dispatch(deleteRecord(record._id))}>
                    <FaTrashAlt />
                </button>
            )}
            <NoteModal record={record} />
        </div>
    )
};

export default RecordItem;
