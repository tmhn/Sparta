var prompt = require('prompt');


// we'll use prompt to get an input from the user
prompt.start();

// get a sentence from the user
prompt.get(['sentence'], function (err, result) {

	// check for errors	
	if (err) { console.log("Sorry. That didn't work") };

	// translate the sentence
	var duckSpeak = translateToDuck(result.sentence);

	// show the result
	console.log(duckSpeak);


});


function translateToDuck(sentence) {

	return sentence.replace(/s/g  , "th");

}
