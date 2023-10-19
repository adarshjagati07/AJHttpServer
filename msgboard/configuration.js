const fs = require("fs");
exports.getConfiguration = function () {
	if (fs.existsSync("conf.json")) {
		let jsonString = fs.readFileSync("conf.json");
		return JSON.parse(jsonString);
	} else {
		return JSON.parse('{"paths":[]}'); //returning an object having path property with an empty array
	}
};
