import axios from 'axios';
import Config from '../../config/config';

const baseUrl = `${Config.getBaseUrl()}/record`;

const getRecords = async (token) => {
    const response = await axios.get(baseUrl, Config.getConfig(token));

    return response.data;
};

const deleteRecord = async (id, token) => {
    const response = await axios.delete(`${baseUrl}/${id}`, Config.getConfig(token));

    return response.data;
};

const addNote = async (note, token) => {
    const { id, text } = note;
    const response = await axios.post(`${baseUrl}/${id}/note`, { text }, Config.getConfig(token));

    return response.data;
};


const recordService = { getRecords, deleteRecord, addNote };
export default recordService;
