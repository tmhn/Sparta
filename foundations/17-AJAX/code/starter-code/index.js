$(function(){

  // on dom ready

  // // create a new instance
  // var request = new XMLHttpRequest();

  // // setup a GET request to the chuck norris api
  // request.open("GET", "http://api.icndb.com/jokes/random");

  // // set the callback function
  // request.addEventListener("load", function(){

  //   var data = JSON.parse(this.responseText);
       
  //   console.log(data);

  // });

  // // send the request
  // request.send();

  setInterval(function(){

    $.get('http://api.icndb.com/jokes/random' , function(data){
      // grab the joke from the data
      var joke = data.value.joke;
      
      // grab the joke title element and set the html
      $("#joke").html(joke);
    });

  } , 10000)


});