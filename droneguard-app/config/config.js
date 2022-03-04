require('dotenv').config();

const getBaseUrl = (env = 'localhost') => {
    // TBD Heroku URL on production
    // return 'http://${process.env.IP}:3001/api';
    return `http://${env}:3001/api`;
};

const getConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const Config = { getBaseUrl, getConfig };
export default Config;
