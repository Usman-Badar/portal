import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://192.168.100.16:3443/',
        // baseURL: 'https://seaportals.herokuapp.com/',
        timeout: 8000
    }
)

export default instance;