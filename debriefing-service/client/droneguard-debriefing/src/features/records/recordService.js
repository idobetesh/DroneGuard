import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/record';

const getConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const getRecords = async (token) => {
    const response = await axios.get(baseUrl, getConfig(token));

    return response.data;
};

const deleteRecord = async (id, token) => {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig(token));

    return response.data;
};

const addComment = async (newComment, token) => {
    const response = await axios.post(`${baseUrl}/comment`, newComment, getConfig(token));

    return response.data;
};


const recordService = { getRecords, deleteRecord, addComment };
export default recordService;