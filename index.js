const http = require("http");
const fs = require("fs");
global.DEBUG = true;

const server = http.createServer((request, response) => {
  if (DEBUG) console.log("Request:", request.url);
  switch (request.url) {
    case "/":
      if (DEBUG) console.log("Root Route");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the Home Page</h1>");
      break;
    case "/home":
      if (DEBUG) console.log("Home Route");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the Home Page</h1>");
      break;
    case "/about":
      if (DEBUG) console.log("About Route");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the About Page</h1>");
      break;
    default:
      if (DEBUG) response.writeHead(200, { "Content-Type": "text/html" });
      response.end("404 not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running...");
});
