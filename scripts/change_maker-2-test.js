function setTest1() {
	console.log("setTest1");
	clearInputs();
}

function runTest1(li) {
	$('button#submit').click();
	console.log("runTest1 - li: " + li + " | chgDue: " + $('#chgDue').text());
	assert($('#chgDue').text() == "Change due: 0.00", "change due should be 0.00.", li);
	assert($('#changeInDenom').text() == '', "No cash should be returned.", li);
	assert($('#error').text() == '', "No error message should be displayed.", li);
}

function setTest2() {
	console.log("setTest2");
	clearInputs();
}

function runTest2() {
	console.log("runTest2");
}

function setTest3() {
	console.log("setTest3");
	clearInputs();
}

function runTest3() {
	console.log("runTest3");
}

function setTest4() {
	console.log("setTest4");
	clearInputs();
}

function runTest4() {
	console.log("runTest4");
}

function setTest5() {
	console.log("setTest5");
	clearInputs();
}

function runTest5() {
	console.log("runTest5");
}

function clearInputs() {
	$('input').val('');
}

function runAll() {
	console.log("runAll");	
}

function assert( outcome, description, output ) { 
	console.log("outcome: " + outcome + " | description: " + description + " | output: " + output);
	var res = outcome ? "PASS: " : "FAIL: "
    $('<p>').text(res.concat( description )).appendTo(output);  
};