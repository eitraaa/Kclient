const http = require("http");
const ejs = require("ejs");
const fs = require("fs");
const url = require("url");

async function startServer(port) {
  const indexPath = "page/pin.ejs";
  const rickroll = "page/rick.ejs";
  const cssPath = "page/style.css";
  const jsPath = "page/page.js";
  const kahootJsPath = "page/kahoot.js";
  const bgJsPath = "other/bg.js";
  const rickjsPath = "page/rick.js";
  const indexp = fs.readFileSync(indexPath, "utf8");
  const rickrollContent = fs.readFileSync(rickroll, "utf8");

  const server = http.createServer(handleRequest);
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  function handleRequest(req, res) {
    const url_parts = url.parse(req.url);
    switch (url_parts.pathname) {
      case "/page.html":
        renderHtml(res, indexp);
        break;

      case "/style.css":
        serveStatic(res, "text/css", cssPath);
        break;

      case "/page.js":
        serveStatic(res, "text/javascript", jsPath);
        break;

      case "/rick.js":
        serveStatic(res, "text/javascript", rickjsPath);
        break;
        
      case "/kahoot.js":
        serveStatic(res, "text/javascript", kahootJsPath);
        break;

      case "/pin":
        renderHtml(res, indexp);
        break;

      case "/enter_pin":
        renderHtml(res, rickrollContent);
        break;

      case "/bg.js":
        serveStatic(res, "text/javascript", bgJsPath);
        break;

      default:
        notFound(res);
        break;
    }
  }

  function renderHtml(res, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(ejs.render(content));
  }

  function serveStatic(res, contentType, filePath) {
    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        notFound(res);
        return;
      }

      res.writeHead(200, { "Content-Type": contentType });
      fs.createReadStream(filePath).pipe(res);
    });
  }

  function notFound(res) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
  }
}

module.exports = {
  startServer,
};
