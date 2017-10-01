var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);
app.get('/', function (req, res) {
    res.send('ack2 "/" ');

});

io.on('connection', function (socket) {
    socket.emit('message', { hello: 'world' });
    socket.on('message', function (data) {
        console.log(data);
    });

});

console.log('----------------- Listen');

