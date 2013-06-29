$(document).ready(function () {
	console.log("DOM loaded");
});
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = moneyFormat($("#cost").val());
	var payment = moneyFormat($("#payment").val());
	var changeDue = (payment >= cost) ? (Math.round((payment - cost)*100)/100) : 0.00; /* Round float math to two decimal places */
	// Accumulators	
	var changeBalRemain = changeDue;
	var changeInDenoms = [];
	var changeAccume = 0.0;
	
	// Iterate over denominations in change drawer
	$('#drawer input').each(function(index) {
		var id = $(this).attr("id"); // id <- denomination name
		var denomQty = parseInt($(this).val());
		var denomVal = moneyFormat($(this).attr("data-denom"));
		var denomFactor = (Math.floor(changeBalRemain / denomVal));
		
		// Factor and accumulate quantities and amounts - basic idea: denomination quantity * denomination value
		if(denomFactor > 0 && denomQty > 0) {
			denomFactor = (denomFactor <= denomQty) ? denomFactor : denomQty;
			changeBalRemain = changeBalRemain - (denomVal * denomFactor);
			// store results for this denomination
			changeInDenoms.push([id, denomFactor]);
			changeAccume = changeAccume + (denomFactor * denomVal);
		}
	});
	
	// Message display
	console.log("changeDue: " + changeDue + " | changeInDenoms: " + changeInDenoms + 
		" | changeBalRemain < 0.01 ? " + (changeBalRemain < 0.01) + " | changeAccume: " + changeAccume);
	$('#changeInDenom').text(stringifyChange(changeInDenoms));
	$('#chgDue').text("Change due: " + changeDue).show();
	if(changeBalRemain > 0.01) {
		$('#error').text("Unable to process transaction--Not enough change");
	}
	else {
		$('#error').text('');	
	}
}

// Maintain two decimal place formatting for floats from strings
function moneyFormat(str) {
	var result = Math.round(parseFloat(str) * 100) / 100;
	return result;
}

// Convert collected data to readable message
function stringifyChange(change) {
	var result = "Change returned: ";
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