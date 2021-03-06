$(document).ready(function () {
	console.log("DOM loaded");
});
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = formatCurrencyCalc($("#cost").val());
	var payment = formatCurrencyCalc($("#payment").val());
	
	if(payment < cost) {
		$('#error').text('Payment is less than the cost.');
		return;
	}
	
	var changeDue = (payment >= cost) ? (Math.round((payment - cost)*100)/100) : 0.00; // Round floats to two decimal places
	// Accumulators	
	var changeBalRemain = changeDue;
	var changeInDenoms = [];
	var changeAccume = 0.0;
	
	// Iterate over denominations in change drawer. This code is decoupled from references to specific denominations.
	$('#drawer input').each(function(index) {
		var id = $(this).attr("id"); // id <- denomination name
		var denomQty = parseInt($(this).val());
		var denomVal = formatCurrencyCalc($(this).attr("data-denom"));
		changeBalRemain = roundCurrencyCalcNum(changeBalRemain);
		var denomFactor = (Math.floor(changeBalRemain / denomVal));
		
		// Factor and accumulate quantities and amounts - basic idea: denomination factor * denomination value
		if(denomFactor > 0 && denomQty > 0) {
			denomFactor = (denomFactor <= denomQty) ? denomFactor : denomQty;
			changeBalRemain = changeBalRemain - (denomVal * denomFactor);
			// store results for this denomination
			changeInDenoms.push([id, denomFactor]);
			changeAccume = changeAccume + (denomFactor * denomVal);
		}
	});
	
	// UI display
	console.log("changeDue: " + changeDue + " | changeInDenoms: " + changeInDenoms + 
		" | changeBalRemain < 0.01 ? " + (changeBalRemain < 0.01) + " | changeAccume: " + changeAccume);
	$('#changeInDenom').text(stringifyChange(changeInDenoms));
	$('#chgDue').text("Change due: " + formatCurrencyPrint(changeDue));
	if(changeBalRemain >= 0.01) {
		$('#error').text("Unable to process transaction; store does not have enough change!");
	}
	else {
		$('#error').text('');	
	}
	// Format input fields display with two decimal places
	$("#cost").val(formatCurrencyPrint(cost));
	$("#payment").val(formatCurrencyPrint(payment));
}

// Maintain two decimal place formatting for floats from strings
// Maintain two decimal places for float calc
function roundCurrencyCalcNum(num) {
	var result = Math.round(parseFloat(num) * 100) / 100;
	return result;
}

function formatCurrencyCalc(str) {
	var result = Math.round(parseFloat(str) * 100) / 100;
	return result;
}

function formatCurrencyPrint(num) {
    num = isNaN(num) || num === '' || num === null ? 0.00 : num;
    return parseFloat(num).toFixed(2);
}

// Convert collected data to readable message
function stringifyChange(change) {
	var result = "";
	if(change.length == 0) return result;
	else result = result.concat("Change returned: ");
	var denom = 0, qty = 1;
	for(var i = 0; i < change.length; i++) {
		result = result.concat(change[i][denom], ": ", change[i][qty]);
		if(i < change.length - 1) result = result.concat(", ");
	}
	return result;
}

function clearFields() {
	$("#cost").val('');
	$("#payment").val('');
	$('#changeInDenom').text('');
	$("#chgDue").text('');
	$('#error').text('');
}