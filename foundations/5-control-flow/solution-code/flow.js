
var money_in_my_pocket = prompt('How much money do you have?');
var drinks_drunk = prompt('How many have you had already?');
var price_of_crisps = prompt('How much are those crisps?');

if (money_in_my_pocket > 10 && drinks_drunk < 3) {
  console.log("Another drink please!");
} else if (money_in_my_pocket > 5 || price_of_crisps == 0) {
  console.log("Just crisps then");
} else {
  console.log("I'm off home... sigh");
}