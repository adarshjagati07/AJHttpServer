var thisModule = this;
exports.processError = function (error, socket, resource) {
	if (error == 404) {
		thisModule.send404(socket, resource);
	}
};

exports.send404 = function (socket, resource) {
	var body = "<!doctype html>";
	body = body + "<html lang='en'>";
	body = body + "<head>";
	body = body + "<title>404 Not Found</title>";
	body = body + "<meta charset='utf-8'>";
	body = body + "</head>";
	body = body + "<body>";
	body = body + "<h1 align='center'>Resource Not Found</h1>";
	body =
		body +
		"<p>The requested URL /" +
		resource +
		" was not found on this server</p>";
	body = body + "</body>";
	body = body + "</html>";
	var header = "HTTP/1.1 404 Not Found\n";
	header = header + new Date().toGMTString() + "\n";
	header = header + "Server: AJWebProjector\n";
	header = header + "Content-Type: text/html\n";
	header = header + "Content-Length: " + body.length + "\n";
	header = header + "Connection: close\n";
	header = header + "\n";
	socket.write(header + body);
};
