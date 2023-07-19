const socket = require("socket.io");
const connectedUsers = {};
const User = require("../models/user.model");

let io;
let userSocket;

function socketConfig(server) {
  io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connection established");

    userSocket = socket;

    socket.on("join", async (data) => {
      const user = await User.findOne({ _id: data._id });
      if (!user) {
        return socket.emit("error", {
          message: "User not found",
        });
      }
      user.online = true;
      connectedUsers[data._id] = socket.id;
      socket.join(data._id);
      console.log("User joined:", data._id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });
}

function emit(event, data) {
  io.emit(event, data);
}

function emitToUser(userId, event, data) {
  io.to(connectedUsers[userId]).emit(event, data);
}

function emitToRoom(roomId, event, data) {
  io.to(roomId).emit(event, data);
}

function emitToAllExceptUser(userId, event, data) {
  userSocket.broadcast.to(connectedUsers[userId]).emit(event, data);
}

module.exports = {
  socketConfig,
  emit,
  emitToUser,
  emitToRoom,
  emitToAllExceptUser,
};
