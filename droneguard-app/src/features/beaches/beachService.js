import axios from 'axios';
import Config from '../../config/config';

const baseUrl = `${Config.getBaseUrl()}/beach`;

const getBeaches = async (token) => {
    const response = await axios.get(baseUrl, Config.getConfig(token));

    return response.data;
};


const beachService = { getBeaches };
export default beachService;
