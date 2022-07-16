const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
const { executeAction, initPort, closePort } = require('./UARTFunctions');
const mqtt = require("mqtt");

const client = mqtt.connect("http://localhost:1883", {
  username: "HealthData",
  password: "123456789",
});

client.subscribe("mqtt/test"); //your mqtt topic

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

  client.on("message", (topic, payload) => {
    console.log("Recevied")
    console.log(payload.toString());
    // Construct Object Based on data coming from Node MCU
    const dataObject = {
      SPO2: payload.SPO2,
      Heartbeat: payload.Heartbeat,
      time: new Date(),
      user_id: 1
    }

    socket.emit("HealthData", JSON.stringify(dataObject))
  });
});


app.get('/', (req, res) => res.sendFile('index.html'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});
