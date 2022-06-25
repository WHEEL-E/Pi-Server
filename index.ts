import { Socket } from "socket.io-client";

import express from "express";
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

io.on("connection", (socket: Socket) => {
  console.log(`[${socket.id}] socket connected`);

  socket.emit("message", {
    topic: "firstTopic",
    message: "my amazing message",
  });
});

app.get("/", (req: express.Request, res: express.Response) =>
  res.sendFile("index.html", { root: __dirname })
);

http.listen(3000, function () {
  console.log("listening on *:3000");
});
