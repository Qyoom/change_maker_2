$(document).ready(function () {
	console.log("DOM loaded");
});
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = moneyFormat($("#cost").val());
	console.log("cost: " + cost);
	var payment = moneyFormat($("#payment").val());
	console.log("payment: " + payment);
	var changeAmt = (payment >= cost) ? (Math.round((payment - cost)*100)/100) : 0.00;
	console.log("changeAmt: " + changeAmt);
	
	var change = {};
	
	$('#drawer input').each(function(index) {
		var id = $(this).attr("id");
		var denomQty = parseInt($(this).val());
		var denomVal = moneyFormat($(this).attr("data-denom"));
		
		console.log("index " + index + " id: " + id + " | denomQty: " + denomQty + " | denomVal: " + denomVal);
		console.log("denomVal < changeAmt ? " + (denomVal < changeAmt));
		console.log("changeAmt / denomVal : " + (changeAmt / denomVal));
		console.log(Math.floor(changeAmt / denomVal));
		console.log("------------------------------------------");
	});
}

function moneyFormat(str) {
	var result = Math.round(parseFloat(str) * 100) / 100;
	return result;
}

function clearFields(e) {
	e.preventDefault();
	$("#cost").val('');
	$("#payment").val('');
}