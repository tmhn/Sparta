var prompt = require('prompt');
var interest = require('./interest');


// we'll use prompt to get an input from the user
prompt.start();

// title
console.log('--- Interest Calculator ---');

// get a sentence from the user
prompt.get(['deposit' , 'years' , 'rate'], function (err, result) {

	// check for errors	
	if (err) { console.log("Sorry. That didn't work") };

	// use the module to calculate the interest
	var summary = interest.calculateInterest(result.deposit , result.years , result.rate);
	
	console.log('Amount after ' + result.years + ' years : ' + summary.total);
	console.log('Total interest : ' + summary.interest);

});
