import io from 'socket.io-client';

const socket = io.connect('https://192.168.10.116:8888', { autoConnect: true });
// const socket = io.connect('https://192.168.10.14:3443', { autoConnect: true });

export default socket;