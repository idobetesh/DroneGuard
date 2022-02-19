import axios from 'axios';

const API_URL = 'http://localhost:3001/api/user';

const register = async (newUserData) => {
    const response = await axios.post(`${API_URL}/register`, newUserData);

    const data = response.data;

    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    const data = response.data;

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
};

const logout = async () => {
    localStorage.removeItem('user');
};


const authService = { register, login, logout }
export default authService;