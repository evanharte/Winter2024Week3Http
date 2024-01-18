const http = require("http");
const fs = require("fs");
global.DEBUG = true;

const server = http.createServer((request, response) => {
  if (DEBUG) console.log("Request:", request.url);
  let path = "./views/";
  switch (request.url) {
    case "/":
      if (DEBUG) console.log("Root Route");
      path += "index.html";
      if (DEBUG) console.log("Path:", path);
      fetchFile(path);
      break;
    case "/home":
      if (DEBUG) console.log("Home Route");
      path += "home.html";
      if (DEBUG) console.log("Path:", path);
      fetchFile(path);
      break;
    case "/about":
      if (DEBUG) console.log("About Route");
      path += "about.html";
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
