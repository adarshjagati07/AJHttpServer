exports.parseRequest = function (data, mappings) {
	var request = {}; //created an empty object
	request.error = 0;
	var str = data.toString();
	var splits = str.split("\n");
	var firstLine = splits[0];
	var w = firstLine.split(" ");
	request.method = w[0];
	route = w[1];

	if (route == "/") {
		request.resource = "index.html";
	}
	if (route.startsWith("/private")) {
		request.resource = w[1].substring(1);
		request.error = 404;
		return request;
	}
	var paths = mappings.paths;
	paths.forEach(function (obj) {
		if (obj.path == route) {
			request.isClientSideTechnologyResource = false;
			request.resource = obj.resource;
			return request;
		}
	});
	request.resource = w[1].substring(1);
	request.isClientSideTechnologyResource = true;
	return request;
};
