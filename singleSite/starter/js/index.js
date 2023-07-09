function clock() {
	var now = new Date();
	var clockDivision = document.getElementById("clock");
	clockDivision.innerHTML =
		"TIME: " +
		now.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: true
		});
	setTimeout(clock, 1000);
}
window.addEventListener("load", clock);
