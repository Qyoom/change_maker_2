function setTest1() {
	console.log("setTest1");
	clearInputs();
}

function runTest1(li) {
	$('button#submit').click();
	assert($('#chgDue').text() == "Change due: 0.00", "change due should be 0.00.", li);
	assert($('#changeInDenom').text() == '', "No cash should be returned.", li);
	assert($('#error').text() == '', "No error message should be displayed.", li);
}

function setTest2() {
	console.log("setTest2");
	clearInputs();
	$('#ones').val("1");
	$('#halfdollars').val("1");
	$('#quarters').val("1");
	$('#dimes').val("2");
	$('#pennies').val("4");
	$('#cost').val("3");
	$('#payment').val("5");
}

function runTest2(li) {
	console.log("runTest2");
	$('button#submit').click();
	assert($('#chgDue').text() == "Change due: 2.00", "change due should be 2.00.", li);
	assert($('#changeInDenom').text() == 'Change returned: ones: 1, halfdollars: 1, quarters: 1, dimes: 2, pennies: 4', "Change returned: ones: 1, halfdollars: 1, quarters: 1, dimes: 2, pennies: 4", li);
	assert($('#error').text() == 'Unable to process transaction; store does not have enough change!', "Unable to process transaction...", li);
	assert($('#cost').val() == '3.00' && $('#payment').val() == '5.00', "Cost and payment display two decimal places.", li);
}

function setTest3() {
	console.log("setTest3");
	clearInputs();
	$('#ones').val("1");
	$('#halfdollars').val("1");
	$('#quarters').val("1");
	$('#dimes').val("2");
	$('#pennies').val("5");
	$('#cost').val("3");
	$('#payment').val("5");
}

function runTest3(li) {
	console.log("runTest3");
	$('button#submit').click();
	assert($('#chgDue').text() == "Change due: 2.00", "change due should be 2.00.", li);
	assert($('#changeInDenom').text() == 'Change returned: ones: 1, halfdollars: 1, quarters: 1, dimes: 2, pennies: 5', "Change returned: ones: 1, halfdollars: 1, quarters: 1, dimes: 2, pennies: 5", li);
	assert($('#error').text() == '', "No error message", li);
	assert($('#cost').val() == '3.00' && $('#payment').val() == '5.00', "Cost and payment display two decimal places.", li);
}

function setTest4() {
	console.log("setTest4");
	clearInputs();
	$('#tens').val("1");
	$('#ones').val("1");
	$('#halfdollars').val("1");
	$('#quarters').val("4");
	$('#nickels').val("14");
	$('#pennies').val("5");
	$('#cost').val("17.36");
	$('#payment').val("20.00");
}

function runTest4(li) {
	console.log("runTest4");
	$('button#submit').click();
	assert($('#chgDue').text() == "Change due: 2.64", "change due should be 2.64.", li);
	assert($('#changeInDenom').text() == 'Change returned: ones: 1, halfdollars: 1, quarters: 4, nickels: 2, pennies: 4', "Change returned: ones: 1, halfdollars: 1, quarters: 4, nickels: 2, pennies: 4", li);
	assert($('#error').text() == '', "No error message", li);
}

function runAllTests() {
	console.log("runAll");
	setTest1();
	runTest1($('#scroller').find('li')[0]);
	setTest2();
	runTest2($('#scroller').find('li')[1]);
	setTest3();
	runTest3($('#scroller').find('li')[2]);
	setTest4();
	runTest4($('#scroller').find('li')[3]);
}

function clearInputs() {
	$('input').val('');
	$('#error').text('')
}

function assert( outcome, description, output ) { 
	console.log("outcome: " + outcome + " | description: " + description + " | output: " + output);
	var res = outcome ? "PASS: " : "FAIL: "
    $('<p>').text(res.concat( description )).appendTo(output);  
};