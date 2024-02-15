const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const kahoot = require("kahoot.js-latest");

async function startServer(port) {
  const indexPath = __dirname + "/page/pin/pin.ejs";
  const cssPath = __dirname + "/page/pin/pin.css";
  const pinjsPath = __dirname + "/page/pin/pin.js";
  const kahootjsPath = __dirname + "/page/kahoot.js";  

  const app = express();
  const server = http.createServer(app);
  const io = socketio(server);
  const client = new kahoot()

  app.set("view engine", "ejs");

  app.get("/pin", (req, res) => {
    res.render(indexPath);
  });

  app.get("/pin.css", (req, res) => {
    res.sendFile(cssPath);
  });

  app.get("/pin.js", (req, res) => {
    res.sendFile(pinjsPath);
  });

  app.get("/kahoot.js", (req, res) => {
    res.sendFile(kahootjsPath);
  });

  app.get("/test", (req, res) => {
    res.send("test");
  });

  app.use((req, res) => {
    res.status(404).send("404 Not Found");
  });

  io.on("connection", (socket) => {
    console.log("connected to websocket");

    socket.on("join", async (data) => {
      console.log(data);
      try {
        await client.join(data[0], data[1]);
        console.log("joined game");
        socket.emit("joined");
      } catch (error) {
        console.error("Failed to join game:", error);
        socket.emit("error", error.description);
      }
    });
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {
  startServer,
};
