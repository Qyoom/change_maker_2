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
	var changeBalRemain = changeDue;
	console.log("changeDue: " + changeDue);
	
	var changeInDenoms = [];
	var changeAccume = 0.0;
	
	$('#drawer input').each(function(index) {
		var id = $(this).attr("id");
		var denomQty = parseInt($(this).val());
		var denomVal = moneyFormat($(this).attr("data-denom"));
		
		console.log("index " + index + " id: " + id + " | denomQty: " + denomQty + " | denomVal: " + denomVal);
		console.log("denomVal < changeBalRemain ? " + (denomVal < changeBalRemain));
		console.log("changeBalRemain / denomVal : " + (changeBalRemain / denomVal));
		console.log(Math.floor(changeBalRemain / denomVal));
		console.log("------------------------------------------");
		
		var denomFactor = (Math.floor(changeBalRemain / denomVal));
		if(denomFactor > 0 && denomQty > 0) {
			denomFactor = (denomFactor <= denomQty) ? denomFactor : denomQty;
			changeBalRemain = changeBalRemain - (denomVal * denomFactor);
			console.log("this subtraction: " + (denomVal * denomFactor) + " | changeBalRemain: " + changeBalRemain);
			changeInDenoms.push([id, denomFactor]);
			changeAccume = changeAccume + (denomFactor * denomVal);
		}
	});
	
	console.log("changeDue: " + changeDue + " | changeInDenoms: " + changeInDenoms + " | changeBalRemain < 0.01 ? " + (changeBalRemain < 0.01) + " | changeAccume: " + changeAccume);
	$('#change').text(stringifyChange(changeInDenoms));
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