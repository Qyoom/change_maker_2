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
	var changeDue = (payment >= cost) ? (Math.round((payment - cost)*100)/100) : 0.00;
	console.log("changeDue: " + changeDue);
	
	var change = [];
	
	$('#drawer input').each(function(index) {
		var id = $(this).attr("id");
		var denomQty = parseInt($(this).val());
		var denomVal = moneyFormat($(this).attr("data-denom"));
		
		console.log("index " + index + " id: " + id + " | denomQty: " + denomQty + " | denomVal: " + denomVal);
		console.log("denomVal < changeDue ? " + (denomVal < changeDue));
		console.log("changeDue / denomVal : " + (changeDue / denomVal));
		console.log(Math.floor(changeDue / denomVal));
		console.log("------------------------------------------");
		
		var denomFactor = (Math.floor(changeDue / denomVal));
		if(denomFactor > 0 && denomQty > 0) {
			denomFactor = (denomFactor <= denomQty) ? denomFactor : denomQty;
			changeDue = changeDue - (denomVal * denomFactor);
			console.log("this subtraction: " + (denomVal * denomFactor) + " | changeDue: " + changeDue);
			change.push([id, denomFactor]);
		}
	});
	
	console.log("change: " + change + " | changeDue < 0.01 ? " + (changeDue < 0.01));
	$('#change').text(stringifyChange(change));
}

function moneyFormat(str) {
	var result = Math.round(parseFloat(str) * 100) / 100;
	return result;
}

function stringifyChange(change) {
	var result = "Change returned: ";
	var denom = 0, qty = 1;
	for(var i = 0; i < change.length; i++) {
		result = result.concat("" + change[i][denom], ": ", "" + change[i][qty]);
		if(i < change.length - 1) result = result.concat(", ");
	}
	return result;
}

function clearFields(e) {
	e.preventDefault();
	$("#cost").val('');
	$("#payment").val('');
}