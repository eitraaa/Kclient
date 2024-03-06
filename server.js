const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const kahoot = require("kahoot.js-latest");
const { login, authCheck, logout } = require("./db.js");

async function startServer(port) {
  const pinPath = path.join(__dirname, "page/game/pin.ejs");
  const gamePath = path.join(__dirname, "page/game/game.ejs");
  const gamecssPath = path.join(__dirname, "page/game/game.css");
  const pinjsPath = path.join(__dirname, "page/game/pin.js");
  const gamejsPath = path.join(__dirname, "page/game/game.js");
  const kahootjsPath = path.join(__dirname, "page/kahoot.js");

  const loginPath = path.join(__dirname, "page/mypage/login.ejs");
  const mypagePath = path.join(__dirname, "page/mypage/mypage.ejs");
  const mypagejsPath = path.join(__dirname, "page/mypage/mypage.js");
  const mypagecssPath = path.join(__dirname, "page/mypage/mypage.css");

  const testPath = path.join(__dirname, "page/test/test.ejs");
  const testjsPath = path.join(__dirname, "page/test/test.js");

  const app = express();
  const server = http.createServer(app);
  const io = socketio(server);

  app.set("view engine", "ejs");

  app.get("/game", (req, res) => {
    res.render(pinPath, { "ver": "ver 0.6.4" });
  });

  app.get("/login", (req, res) => {
    res.render(loginPath);
  });

  app.get("/home", (req, res) => {
    res.render(mypagePath);
  });

  app.get("/test", (req, res) => {
    res.render(testPath);
  });

  app.get("/page-1", (req, res) => {
    res.render(gamePath);
  });

  app.get("/game.css", (req, res) => {
    res.sendFile(gamecssPath);
  });

  app.get("/game.js", (req, res) => {
    res.sendFile(gamejsPath);
  });

  app.get("/pin.js", (req, res) => {
    res.sendFile(pinjsPath);
  });

  app.get("/kahoot.js", (req, res) => {
    res.sendFile(kahootjsPath);
  });

  app.get("/mypage.js", (req, res) => {
    res.sendFile(mypagejsPath);
  });

  app.get("/mypage.css", (req, res) => {
    res.sendFile(mypagecssPath);
  });

  app.get("/test.js", (req, res) => {
    res.sendFile(testjsPath);
  });

  app.use((req, res) => {
    res.status(404).send("404 Not Found");
  });

  io.on("connection", (socket) => {
    console.log("connected to websocket");

    socket.on("authCheck", async (authData) => {
      const result = await authCheck(authData.id, authData.loginid);
      socket.emit("authCheckResult", result);
    });

    socket.on("login", async (logindata) => {
      const loginResult = await login(logindata.id, logindata.pw);
      socket.emit("loginResult", loginResult);
    });

    socket.on("logout", async (authData) => {
      const data = await logout(authData.id, authData.loginid);
      socekt.emit("logoutResult", data);
    });

    const client = new kahoot();

    socket.on("join", async (playerData) => {
      let pin = playerData.pin;
      let name = playerData.name;
      try {
        await client.join(pin, name);
        socket.emit("joined");
        console.log(playerData);
      } catch (error) {
        console.error("Error joining Kahoot game:", error);
        socket.emit("error", "An error occurred while joining the game");
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