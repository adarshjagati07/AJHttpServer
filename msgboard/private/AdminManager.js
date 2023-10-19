const fs = require("fs");
module.exports = class AdminManager {
	constructor() {}
	index() {
		var adminExists = fs.existsSync("./private/data/admin.conf");
		if (adminExists) {
			try {
				var administrator = JSON.parse(fs.readFileSync("./private/data/admin.conf"));
			} catch (error) {
				adminExists = false;
			}
		}
		adminExists = adminExists && administrator.username && administrator.password;
		if (adminExists) {
			return {
				"forward": "/private/AdminIndex.html"
			};
		} else {
			return {
				"forward": "/private/AdministratorCreationForm.html"
			};
		}
	}
	createAdministrator(administrator) {
		var adminExists = fs.existsSync("./private/data/admin.conf");
		if (adminExists) {
			try {
				var administratorData = JSON.parse(fs.readFileSync("./private/data/admin.conf"));
			} catch (error) {
				adminExists = false;
				fs.unlinkSync("./private/data/admin.conf");
			}
		}
		adminExists = adminExists && administratorData.username && administratorData.password;
		if (!adminExists) {
			var administratorJSON = {
				"username": administrator.username,
				"password": administrator.password
			};
			fs.writeFileSync("./private/data/admin.conf", JSON.stringify(administratorJSON));
		}
		return {
			"forward": "/private/AdminIndex.html"
		};
	}
	checkCredentials(administrator) {
		var adminExists = fs.existsSync("./private/data/admin.conf");
		if (adminExists) {
			try {
				var administratorData = JSON.parse(fs.readFileSync("./private/data/admin.conf"));
			} catch (error) {
				adminExists = false;
			}
		}
		adminExists = adminExists && administratorData.username && administratorData.password;
		if (!adminExists) {
			return {
				"forward": "/admin"
			};
		}
		return {
			"success":
				administratorData.username == administrator.username &&
				administratorData.password == administrator.password
		};
	}
	logout() {
		return {
			"forward": "/private/AdminIndex.html"
		};
	}

	home() {
		//i will change this code later on, and apply check for backdoor entry
		return {
			"forward": "/private/AdminHome.html"
		};
	}
};
