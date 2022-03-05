import axios from 'axios';
import Config from '../../config/config';

const baseUrl = `${Config.getBaseUrl()}/user`;

const login = async (userData) => {
    const response = await axios.post(`${baseUrl}/login`, userData);

    const data = response.data;

    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
};

const logout = async () => {
    localStorage.removeItem('user');
};


const authService = { login, logout };
export default authService;
