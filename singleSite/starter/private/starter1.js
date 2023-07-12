var thisModule = this;
exports.processRequest = function (request, response) {
	var name = request.data["nm"];
	var city = request.data["ct"];
	var gender = request.data["gender"];
	var address = request.data["address"];

	var body = "<!doctype html>";
	body = body + "<html lang='en'>";
	body = body + "<head>";
	body = body + "<title>404 Not Found</title>";
	body = body + "<meta charset='utf-8'>";
	body = body + "</head>";
	body = body + "<body>";
	body = body + "<h1> This is starter.js file of Private folder</h1>";
	body =
		body +
		"<h2 align='center'> We are heading towards our first dynamic page</h2>";
	body = body + "<h3> Contents of data coming from request: </h3><br>";
	body = body + "<p>Name : " + name + "</p>";
	body = body + "<p>City : " + city + "</p>";
	body = body + "<p>Gender : " + gender + "</p>";
	body = body + "<p>Address : " + address + "</p>";
	body = body + "</body>";
	body = body + "</html>";
	var header = "HTTP/1.1 404 Not Found\n";
	header = header + new Date().toGMTString() + "\n";
	header = header + "Server: AJWebProjector\n";
	header = header + "Content-Type: text/html\n";
	header = header + "Content-Length: " + body.length + "\n";
	header = header + "Connection: close\n";
	header = header + "\n";
	response.write(header + body);
};
