window.onload = function () {
	console.log("DOM loaded");
}
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = document.getElementById("cost");
	cost = parseFloat(cost.value);
	
	var payment = document.getElementById("payment");
	payment = parseFloat(payment.value);
}

function clearFields(e) {
	e.preventDefault();
	document.getElementById("cost").value='';
	document.getElementById("payment").value='';
}