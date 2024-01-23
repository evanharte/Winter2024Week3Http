const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

global.DEBUG = true;

myEmitter.on("route", (url) => {
  const d = new Date();
  if (DEBUG) console.log(`Route Event: ${url} at ${d}`);
  if (!fs.existsSync(path.join(__dirname, "logs"))) {
    fs.mkdirSync(path.join(__dirname, "logs"));
  }
  fs.appendFile(
    path.join(__dirname, "logs", "route.log"),
    `Route Event on: ${url} at ${d}\n`,
    (error) => {
      if (error) throw error;
    }
  );
});

global.DEBUG = true;

const server = http.createServer((request, response) => {
  let path = "./views/";
  switch (request.url) {
    case "/":
      path += "index.html";
      myEmitter.emit("route", path);
      if (DEBUG) console.log("Path:", path);
      fetchFile(path);
      break;
    case "/home":
      response.statusCode = 301; // moved permenently
      response.setHeader("Location", "/");
      response.end();
      break;
    case "/cookie":
      response.setHeader("Set-Cookie", "fullName=Fred Flintstone");
      response.end("Cookie Set");
      break;
    case "/about":
      path += "about.html";
      myEmitter.emit("route", path);
      if (DEBUG) console.log("Path:", path);
      fetchFile(path);
      break;
    default:
      if (DEBUG) response.writeHead(200, { "Content-Type": "text/html" });
      response.end("404 not found");
      break;
  }
  function fetchFile(fileName) {
    fs.readFile(fileName, (error, content) => {
      if (error) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("500 Internal Server Error");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(content, "utf-8");
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running...");
});
