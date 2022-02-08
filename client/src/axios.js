import axios from 'axios';

// let server = sessionStorage.getItem('IPv4') || '192.168.100.14';
// console.log('https://' + server + ':3443');

const instance = axios.create(
    {
        baseURL: 'https://192.168.10.116:8888',
        // baseURL: 'https://192.168.10.14:3443',
        // baseURL: 'https://seaportals.herokuapp.com/',
    }
)

export default instance;