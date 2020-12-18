const express = require("express");
const port = 3001;
const app = express();

// View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Main Route
app.get("/", function(req, res) {
  res.render("index");
});

// Server Listen
const server = app.listen(port, function() {
  console.log("Server Is Listening On Port: -> ", port);
});

// Include socket.io
const io = require("socket.io")(server);

io.on("connection", function(socket) {
  console.log("A New Client Has Been Connected");

  socket.username = "Anonymous";
  socket.on("new_message", function(data) {
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username
    });
  });

  socket.on("change_username", function(data) {
    socket.username = data.username;
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});
