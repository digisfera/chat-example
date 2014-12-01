var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var autolinker = require( 'autolinker' );

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var msgWithLinks = autolinker.link(msg);
    io.emit('chat message', msgWithLinks);
  });
});

var port = 4012;
http.listen(port, function(){
  console.log('listening on *:' + port);
});
