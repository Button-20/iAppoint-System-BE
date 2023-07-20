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
      console.log("User joined:", data._id);
      const user = await User.findOne({ _id: data._id });
      if (!user)
        return socket.emit("error", {
          message: "User not found",
        });

      user.online = true;
      await user.save();
      connectedUsers[data._id] = socket.id;
      socket.join(data._id);
      console.log("User joined:", data._id);
    });

    socket.on("disconnect", async () => {
      console.log("Socket disconnected");

      for (const userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          delete connectedUsers[userId];
          let user = await User.findOne({ _id: userId });
          if (!user)
            return socket.emit("error", {
              message: "User not found",
            });

          user.online = false;
          await user.save();
          break;
        }
      }
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
