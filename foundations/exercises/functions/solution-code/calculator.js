var tryagain = true;

// Bonus, keep looping until we say stop
while (tryagain) {

   

}

function run() {



}

function menu() {

    // get the user inputs
    var value1 = parseFloat(prompt('enter first value')); // parseFloat to turn the string to a decimal number
    var value2 = parseFloat(prompt('enter the second value'));
    var choice = prompt('Choose your action (a)dd (s)ubtract (m)ultiply (d)ivide') || "a";

    // create an empty answer variable
    var answer = null;

    // check all the options and perform the actions
    if(choice == "a") {

        answer = value1 + value2;

    } else if(choice == "s") {

        answer = value1 - value2;

    } else if(choice == "m") {

        answer = value1 * value2;

    } else if(choice == "d") {

        answer = value1 / value2;

    } else { // didn't match any of the options

      alert('Sorry, that option was not valid');

    }

    // only print the answer if we calculated one
    if(answer)
      alert(answer);


    // should we continue. "" is falsey "q" is truthy
    tryagain = !prompt('Enter to continue, or (q)uit');
    
}