const express = require('express')
const app = express();
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

io.on('connection', function(socket) {
  socket.on('playerEvent', function(msg) {
    console.log(msg);
    io.emit('playerEvent', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('seekEvent', function(time) {
    console.log(time);
    io.emit('seekEvent', time);
  });
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
