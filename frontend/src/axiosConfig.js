import axios from 'axios';

const getTokenAndUID = () => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    return { token, uid };
};

const instance = axios.create({
    baseURL: 'http://192.168.41.61:8080', // change it later
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const { token, uid } = getTokenAndUID();
        if (token && uid) {
            config.headers['Authorization'] = token; // Set token in Authorization header
            config.headers['UID'] = uid; // Set UID in custom header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
  
export default instance; 