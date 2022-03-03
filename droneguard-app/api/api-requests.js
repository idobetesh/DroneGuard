import axios from 'axios';
import Config from '../config/config.js';


const login = async (userData) => {
    let response;
    try {
        response = await axios.post(`${Config.getBaseUrl()}/user/login`, userData);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

    return response;
};

const Api = { login };
export default Api;
