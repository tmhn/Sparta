$(function(){

  console.log('dom is ready');

  // change html of count span
  $("#count").html('5');

  // add class done to all the elements
  $("li").addClass('done');

  // chained version
  $("#count").html("5").css('color' , '#BBCCAA');

  // create a new element and add it to the list
  $("#list").prepend($("<li>New Item</li>"));

});