$(document).ready(function () {
	console.log("DOM loaded");
});
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = parseFloat($("#cost").val());
	var payment = parseFloat($("#payment").val());
	
	$('#drawer input').each(function(index) {
		var id = $(this).attr("id");
		var val = $(this).val();
		var denom = $(this).attr("data-denom");
		console.log("index " + index + " id: " + id + " | val: " + val + " | denom: " + denom);
	});
}

function clearFields(e) {
	e.preventDefault();
	$("#cost").val('');
	$("#payment").val('');
}