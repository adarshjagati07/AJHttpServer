const fs = require("fs");
const mimeTypes = require("mime-types");
const net = require("net");
const configuration = require("./configuration");
const errors = require("./errors");
const requestParser = require("./requestParser");
var mappings = configuration.getConfiguration();

function Response(socket) {
	this.responseInitiated = false;
	this.$$$socket = socket;
	this.contentType = "text/html";
	this.setContentType = function (str) {
		this.contentType = str;
	};
	this.write = function (data) {
		if (this.responseInitiated == false) {
			this.$$$socket.write("HTTP/1.1 200 OK\n");
			this.$$$socket.write(new Date().toGMTString() + "\n");
			this.$$$socket.write("Server: AJWebProjector\n");
			this.$$$socket.write("Content-Type: " + this.contentType + "\n");
			this.$$$socket.write("Connection: close\n\n");
			this.responseInitiated = true;
		}
		this.$$$socket.write(data);
	};
}

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

	// var file = resource;
	// var header = "HTTP/1.1 200 OK\n";
	// header = header + `Content-Type: ${mimeTypes.lookup(resource)}\n`;
	// header = header + `Content-Length: ${     }\n`; //the issue is currently i am not getting how to get content length;
	// header = header + "\n";
	// socket.write(header);
	// var bufferSize = 1024;
	// var buffer = Buffer.alloc(bufferSize);
	// var fileDescriptor = fs.openSync(file, "r");
	// var data;
	// var bytesExtracted;
	// while (true) {
	// 	bytesExtracted = fs.readSync(fileDescriptor, buffer, 0, bufferSize);
	// 	if (bytesExtracted == 0) {
	// 		fs.closeSync(fileDescriptor);
	// 		break;
	// 	} else if (bytesExtracted < bufferSize) {
	// 		data = buffer.slice(0, bytesExtracted);
	// 	} else {
	// 		data = buffer;
	// 	}
	// 	socket.write(data);
	// }
}

var httpServer = net.createServer(function (socket) {
	socket.on("data", function (data) {
		var request = requestParser.parseRequest(data, mappings);
		if (request.error != 0) {
			errors.processError(request.error, socket, request.resource);
		}
		if (request.isClientSideTechnologyResource) {
			serverResource(socket, request.resource);
		} else {
			console.log("Server side resource : " + request.resource + " will be processed ");
			var service = require("./private/" + request.resource);
			service.processRequest(request, new Response(socket));
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
