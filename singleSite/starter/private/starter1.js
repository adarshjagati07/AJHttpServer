var thisModule = this;
exports.processRequest = function (request, response) {
	var name = request.data["nm"];
	var city = request.data["ct"];
	var gender = request.data["gender"];
	var address = request.data["address"];
	response.setContentType("text/html");

	response.write("<!doctype html>");
	response.write("<html lang='en'>");
	response.write("<head>");
	response.write("<title>Sample File</title>");
	response.write("<meta charset='utf-8'>");
	response.write("</head>");
	response.write("<body>");
	response.write("<h1> This is starter.js file of Private folder</h1>");
	response.write("<h2 align='center'> We are heading towards our first dynamic page</h2>");
	response.write("<h3> Contents of data coming from request: </h3><br>");
	response.write("<p>Name : " + name + "</p>");
	response.write("<p>City : " + city + "</p>");
	response.write("<p>Gender : " + gender + "</p>");
	response.write("<p>Address : " + address + "</p>");
	response.write("</body>");
	response.write("</html>");
};
//now user don't have to write header's over here also no need to string concatination
//simply this is going to be the procedure to run their dynamic html pages.
//they just have to set the content type and response.write their html document.
