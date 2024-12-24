const pubSub = require("./redisClient");

module.exports = (socket, io) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("sendMessage", ({ room, message }) => {
    if (!room || !message) {
      console.error("Invalid room or message");
      return;
    }
    console.log(`Publishing to Redis: ${room} - ${message}`);
    try {
      pubSub.publisher.publish(room, message);
    } catch (err) {
      console.error("Redis Publish Error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};
