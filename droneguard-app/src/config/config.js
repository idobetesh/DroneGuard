const getBaseUrl = () => {
    // TBD Heroku URL on production
    return 'http://localhost:3001/api';
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
