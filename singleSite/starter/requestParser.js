const qs = require("querystring");
exports.parseRequest = function (data, mappings) {
	var request = {}; //created an empty object
	request.error = 0;
	var str = data.toString();
	var splits = str.split("\n");
	var firstLine = splits[0];
	var w = firstLine.split(" ");
	request.method = w[0].toUpperCase();
	route = w[1];
	request.queryString = null;
	request.data = {};
	request.isClientSideTechnologyResource = true;

	if (request.method == "GET") {
		var i = route.indexOf("?");
		if (i != -1) {
			request.isClientSideTechnologyResource = false;
			request.queryString = route.substring(i + 1);
			request.data = JSON.parse(
				JSON.stringify(qs.decode(request.queryString))
			);
			route = route.substring(0, i);
			//temoporarily for data printing and debugging
			console.log(request.queryString);
			console.log("--------------------");
			console.log(request.data);
			//untill here
			request.resource = route.substring(1);
		}
	}
	if (request.method == "POST") {
		//will do it later
	}

	if (route == "/") {
		request.resource = "index.html";
		request.isClientSideTechnologyResource = true;
		return request;
	}
	if (route.startsWith("/private")) {
		request.resource = route.substring(1);
		request.error = 404;
		return request;
	}
	if (request.isClientSideTechnologyResource == false) {
		var paths = mappings.paths;
		paths.forEach(function (obj) {
			if (obj.path == route) {
				request.isClientSideTechnologyResource = false;
				request.resource = obj.resource;
			}
		});
		return request;
	}
	request.resource = route.substring(1);
	return request;
};
