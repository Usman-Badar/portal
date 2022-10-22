import io from 'socket.io-client';

const socket = io.connect('http://192.168.100.116:8888', { autoConnect: true });
// const socket = io.connect('http://202.63.220.170:3443/', { autoConnect: true });
// const socket = io.connect("http://" + window.location.host, { autoConnect: true });
// const socket = io.connect('http://203.101.174.221:8888', { autoConnect: true });

export default socket;