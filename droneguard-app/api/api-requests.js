import axios from 'axios';
import Config from '../config/config.js';
import DroneGuardUtils from '../utils/droneguard-utils.js';


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

const getBeaches = async () => {
    let response;
    const user = await DroneGuardUtils.getFromStore('user');

    try {
        response = await axios.get(`${Config.getBaseUrl()}/beach`, Config.getConfig(user.token));
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

    return response;
};

const Api = { login, getBeaches };
export default Api;
