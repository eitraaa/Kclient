const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

async function startServer(port) {
  const indexPath = "page/pin/pin.ejs";
  const cssPath = "page/pin/pin.css";
  const pinjsPath = "page/pin/pin.js";

  const app = express();

  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    res.render(indexPath);
  });

  app.get("/pin.css", (req, res) => {
    res.sendFile(cssPath);
  });

  app.get("/pin.js", (req, res) => {
    res.sendFile(pinjsPath);
  });

  app.use((req, res) => {
    res.status(404).send("404 Not Found");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {
  startServer,
};
