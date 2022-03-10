import axios from 'axios';
import Config from '../config/config.js';

import { store } from '../app/store';

const getBeaches = async (token) => {
    let response;
    try {
        response = await axios.get(`${Config.getBaseUrl()}/beach`, Config.getConfig(token));
    } catch (error) {
        console.error(error);
    }

    return response;
};

const Api = { getBeaches };
export default Api;
