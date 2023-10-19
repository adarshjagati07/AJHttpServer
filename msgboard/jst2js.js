const fs = require("fs");
exports.prepareJS = function (jstFile, request) {
	var privateFolder = "./private";
	if (!fs.existsSync(privateFolder)) {
		fs.mkdirSync(privateFolder);
	}
	var jstFolder = "./private/jst";
	if (!fs.existsSync(jstFolder)) {
		fs.mkdirSync(jstFolder);
	}
	//open file and create new filename with extension as js
	var jsFileName = jstFile.substring(0, jstFile.length - 3) + "js";
	var jsFilePath = "./private/jst/" + jsFileName;
	var jsFile = fs.openSync(jsFilePath, "w");

	fs.writeSync(jsFile, "exports.processRequest = function(request,response){\r\n");

	var lines = fs.readFileSync(jstFile).toString().split("\n");
	var line = null;
	for (i in lines) {
		line = lines[i].replace(/\r|\n/g, "");
		line = line.replace(/"/g, '\\"');

		//placing our dynamic content via request.
		line = line.replace(/\$\$\$\{.*?\}/g, function (keyword) {
			var length = keyword.length;
			keyword = keyword.substring(4, length - 1);
			var flag = 0;
			for (const property in request) {
				if (keyword == property) {
					flag = 1;
					break;
				}
			}
			if (flag == 1) {
				return `\"+request.${keyword}+\"`;
			} else {
				return "";
			}
		});
		//dynamic content placing ends here

		fs.writeSync(jsFile, 'response.write("' + line + '");\r\n');
	}

	fs.writeSync(jsFile, "response.close();\r\n");
	fs.writeSync(jsFile, "}\r\n");
	fs.closeSync(jsFile);
	return "jst/" + jsFileName;
};
