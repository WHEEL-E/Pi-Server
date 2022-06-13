const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
const { spawn } = require("child_process");
const { executeAction, initPort } = require('./UARTFunctions');

io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  initPort()

  socket.on('disconnect', reason => {
    stopCommand()
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });

  socket.on("action", action => { executeAction(action) })

  socket.on("action-stop", stop => { executeAction(stop) })
});


// TODO Do we still need this command thing ?! 
// let command

// const runCommand = (command, args) => {
//   command = spawn(command, args ? args : []); // (command, argument to the command)

//   command.stdout.on("data", data => {
//     console.log(`stdout: ${data}`);
//   });

//   command.stderr.on("data", data => {
//     console.log(`stderr: ${data}`);
//   });

//   command.on('error', (error) => {
//     console.log(`error: ${error.message}`);
//   });

//   command.on("close", code => {
//     console.log(`child process exited with code ${code}`);
//   });
// }

// const stopCommand = () => {
//   if (command) {
//     command.kill()
//   }
// }

app.use(cors());

app.get('/', (req, res) => res.sendFile('index.html'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});
