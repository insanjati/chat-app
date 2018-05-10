const express = require('express');
const socket = require('socket.io');

// app setup
const app = express();
const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(`listening to request on port ${PORT}`);
});

// static files, view in this case
app.use(express.static('public'));

// socket.io setup
const io = socket(server);

io.on('connection', socket => {
    console.log('client is connected', socket.id);
    // handle chat event
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });
    // handle typing event
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});
