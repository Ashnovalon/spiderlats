const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const pubSub = require("./redisClient");
const socketHandler = require("./socketHandler");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

pubSub.subscriber.on("message", (channel, message) => {
  console.log(`Message from Redis Channel: ${channel}`);
  io.to(channel).emit("message", message);
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socketHandler(socket, io);
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
