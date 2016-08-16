$(function(){

  // on dom ready

  // create a new instance
  var request = new XMLHttpRequest();

  // setup a GET request to the chuck norris api
  request.open("GET", "http://api.icndb.com/jokes/random");

  // set the callback function
  request.addEventListener("load", function(){

    var data = JSON.parse(this.responseText);
       
    console.log(data);

  });

  // send the request
  request.send();


});