import { io } from "socket.io-client";

const socket = io('http://localhost:3000', {
    query: {
        room: 'da801e75'
    }
});

socket.emit('evaluation', 'test1');

socket.on('user-joined', () => {
    console.log('joined')
})

socket.on('evaluation', () => {
    console.log('evaluation')
})