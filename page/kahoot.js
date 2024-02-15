const socket = io();

function joinGame(pin, name) {
  const data = [pin, name];
  socket.emit("join", data);
}

socket.on("joined", () => {
  alert("joined");
});

socket.on("error", (error) => {
  alert("error: " + error);
});