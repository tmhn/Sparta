var listItems = ["Go out","Come back" , "Buy food" , "Eat food"];


function addListItem(value) {

  // get the list ul
  var ul = document.getElementById("list");

  // create the new element
  var li = document.createElement("li");

  // set the value of the li to the one passed in to the function
  li.innerHTML = value;

  // append the li to the list ul
  ul.appendChild(li);
  

}

// write append loop here

for (var i = 0 ; i < listItems.length ; i++) {

  // get the array value
  var value = listItems[i];

  // pass the value to the function
  addListItem(value);

}

// write the class loop here

var lis = document.querySelectorAll("li");

for (var i = 0 ; i < lis.length ; i++) {

  // decide on the class name
  var className = i % 2 ? "even" : "";

  // get a single li
  var li = lis[i];

  // set the class;
  li.className = className;

}

// set the class count here
var countSpan = document.getElementById("count");

// set the html of the span
countSpan.innerHTML = lis.length;




