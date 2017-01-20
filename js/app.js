function send(msg) {
	var details = document.getElementById("details");
	details.innerHTML += "<br>" + msg;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



controller.init();