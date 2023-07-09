const fs = require("fs");
const mimeTypes = require("mime-types");
const net = require("net");
const configuration = require("./configuration");
const errors = require("./errors");
const requestParser = require("./requestParser");
var mappings = configuration.getConfiguration();

function serverResource(socket, resource) {
	if (!fs.existsSync(resource)) {
		errors.send404(socket, resource);
		return;
	}
	//do not use the following code, instead send data in chunks of 1024
	var data = fs.readFileSync(resource, "utf-8");
	var header = "HTTP/1.1 200 OK\n";
	header = header + `Content-Type: ${mimeTypes.lookup(resource)}\n`;
	header = header + `Content-Length: ${data.length}\n`;
	header = header + "\n";
	var response = header + data;
	socket.write(response);
}

var httpServer = net.createServer(function (socket) {
	socket.on("data", function (data) {
		var request = requestParser.parseRequest(data);
		if (request.isClientSideTechnologyResource) {
			serverResource(socket, request.resource);
		} else {
			//will code this part later on
		}
	});
	socket.on("end", function () {
		console.log("Connection closed by Client");
	});
	socket.on("error", function () {
		console.log("Some error on Client Side");
	});
});

httpServer.listen(8080, "localhost");
console.log("AJHttpServer is up : port 8080");
