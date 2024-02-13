const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const routes = require("./routes.js");

global.DEBUG = true;

// myEmitter.on("route", (url) => {
//   const d = new Date();
//   if (DEBUG) console.log(`Route Event: ${url} at ${d}`);

//   // using file system to write to a file 'logs' folder
//   if (!fs.existsSync(path.join(__dirname, "logs"))) {
//     fs.mkdirSync(path.join(__dirname, "logs"));
//   }
//   fs.appendFile(
//     path.join(__dirname, "logs", "route.log"),
//     `Route Event on: ${url} at ${d}\n`,
//     (error) => {
//       if (error) throw error;
//     }
//   );
// });

global.DEBUG = true;

const server = http.createServer((request, response) => {
  let path = "./views/";
  switch (request.url) {
    case "/":
      path += "index.html";
      myEmitter.emit("route", path);
      routes.indexPage(path, response);
      break;
    case "/homepage":
      path += "home.html";
      myEmitter.emit("route", path);
      routes.homePage(path, response);
      break;
    case "/about-me":
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
      routes.aboutPage(path, response);
      break;
    default:
      if (DEBUG) response.writeHead(200, { "Content-Type": "text/html" });
      response.end("404 not found");
      break;
  }
});

server.listen(3000, () => {
  console.log("Server is running well...");
});
