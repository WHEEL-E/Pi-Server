const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
const { executeAction, initPort, closePort } = require('./UARTFunctions');

initPort();

app.use(cors());

io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  initPort();

  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
    closePort();
  });

  socket.on("action", action => { executeAction(action) })

  socket.on("action-stop", stop => {
    executeAction(stop);
    setTimeout(() => {
      executeAction(stop)
    }, 500);
  })
});

app.get('/', (req, res) => res.sendFile('index.html'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});
