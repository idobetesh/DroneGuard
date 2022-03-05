import axios from 'axios';
import Config from '../../config/config';

const baseUrl = `${Config.getBaseUrl()}/record`;

const createRecord = async (record, token) => {
    const response = await axios.post(baseUrl, record, Config.getConfig(token));

    return response.data;
};


const recordService = { createRecord };
export default recordService;
