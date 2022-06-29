const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
const { executeAction, initDrivingPort, closeDrivingPort, HealthPort } = require('./UARTFunctions');

initDrivingPort();

app.use(cors());

io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  initDrivingPort();

  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
    closeDrivingPort();
  });

  socket.on("action", action => { executeAction(action) })

  socket.on("action-stop", stop => {
    executeAction(stop);
    setTimeout(() => {
      executeAction(stop)
    }, 500);
  })
});


HealthPort.on("readable", () => {
  console.log("Data", HealthPort.read())
})

HealthPort.on("data", (data) => {
  console.log('Data:', data)
})

app.get('/', (req, res) => res.sendFile('index.html'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});
