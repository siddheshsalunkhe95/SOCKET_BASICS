$(document).ready(function () {
  var socket = io.connect("http://localhost:3001");

  $("#change_message").click(function () {
    socket.emit("new_message", {
      message: $("#message").val(),
    });
  });

  socket.on("new_message", function (data) {
    $("#message").val("");
    $("#feedback").append("<p>" + data.username + ":" + data.message + "</p>");
  });

  $("#change_username").click(function () {
    socket.emit("change_username", {
      username: $("#username").val(),
    });
  });

  $("#message").bind("keypress", function () {
    socket.emit("typing");
  });

  socket.on("typing", function (data) {
    $("#feedback").html(
      "<p><i>" + data.username + " is typing a message..." + "</p></i>"
    );
  });
});
