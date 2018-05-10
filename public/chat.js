// make connection
const socket = io.connect('http://localhost:4000');

// query DOM
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// emit events
btn.addEventListener('click', () => {
    socket.emit('chat', { 
        message: message.value,
        handle: handle.value 
    });
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
})

// listen for events
socket.on('chat', data => {
    feedback.innerHTML = '';
    message.value = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on('typing', data => {
    feedback.innerHTML = '<p><em>' + data + ' is typing ...</em></p>';
})