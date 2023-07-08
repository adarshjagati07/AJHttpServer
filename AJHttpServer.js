const net = require("net");
const fs = require("fs");
let httpServer = net.createServer(function (socket) {
   socket.on("data", function (data) {
      var data = fs.readFileSync("index.html", "utf-8");
      var response = data;
      var responseLength = response.length;
      var a = "HTTP/1.1 200 OK\n"; //(a) is nothing but simply a (Header) over here
      a = a + "Content-Type:text/html\n"; //MIME type
      a = a + `Content-Length:${responseLength}\n`;
      a = a + "\n";
      a = a + response;
      socket.write(a);
   });
   socket.on("error", function () {
      console.log("There is some problem in client side!!");
   });
   socket.on("end", function () {
      console.log("Connection Ended..");
   });
});

httpServer.listen(8080, "localhost");
console.log("AJHttpServer is listening on port 8080");
