$(document).ready(function () {
	console.log("DOM loaded");
});
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = parseFloat($("#cost").val());
	var payment = parseFloat($("#payment").val());
}

function clearFields(e) {
	e.preventDefault();
	$("#cost").val('');
	$("#payment").val('');
}