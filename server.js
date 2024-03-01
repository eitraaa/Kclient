const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const kahoot = require("kahoot.js-latest");
const { hash } = require("./other.js");

async function startServer(port) {
  const pinPath = path.join(__dirname, "/page/game/pin.ejs");
  const gamePath = path.join(__dirname, "/page/game/game.ejs");
  const gamecssPath = path.join(__dirname, "/page/game/game.css");
  const pinjsPath = path.join(__dirname, "/page/game/pin.js");
  const kahootjsPath = path.join(__dirname, "/page/kahoot.js");

  const app = express();
  const server = http.createServer(app);
  const io = socketio(server);

  app.set("view engine", "ejs");

  app.get("/game", (req, res) => {
    res.render(pinPath);
  });

  app.get("/page-1", (req, res) => {
    res.render(gamePath);
  });

  app.get("/pin.css", (req, res) => {
    res.sendFile(gamecssPath);
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

    const client = new kahoot();

    socket.on("join", async (playerData) => {
      let pin = playerData.pin;
      let name = playerData.name;
      try {
        await client.join(pin, name);
        socket.emit("joined");
        console.log(playerData);
      } catch (error) {
        console.log(error);
        socket.emit("error", error);
      }
    });

    client.on("Joined", (data) => {
      socket.emit("joined", data);
    });

    client.on("QuestionStart", (question) => {
      socket.emit("newquestion");
    });

    socket.on("answer", (ans) => {
      client.answer(ans);
    });

    client.on("QuizEnd", () => {
      console.log("The quiz has ended.");
    });
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {
  startServer,
};
