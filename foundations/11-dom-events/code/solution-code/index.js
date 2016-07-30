document.addEventListener('DOMContentLoaded', function(){


  // write code here
  // get the element that will fire the event
  var myButton = document.getElementById("myButton");

  // add an event listener for click
  myButton.addEventListener("click" , handleClick); 

  function handleClick() {

    // the code to run when the event occurs
    console.log('Button was clicked');

  }


  // set the listener
  myForm.addEventListener('submit' , function(event) {

      // the event object can be used to stop the default behaviour of the browser
      // this will stop the form from submitting until we're ready
      event.preventDefault();
      
      // check the name field to make sure it's valid
      var firstnameField = document.getElementById('firstname');
      
      // make sure the field has a value
      if(!firstnameField.value) {
      
        // show a message to the user
        console.log('You must enter a first name');
        
        // stop the code here
        return;
      }
      
      // all checks passed so we can submit our form with javascript
      myForm.submit();


  });

  // this

  var buttons = document.querySelectorAll('.myButtons');

  for (var i = 0; i < buttons.length; i++) {

    var button = buttons[i];
    
    button.addEventListener('click' , function(event) {
    
      console.log(this.value + ' was clicked'); // this always refers to the button that was clicked
    
    });

  }


  // event bubbling and capturing

  // get the divs
  var div1 = document.getElementById('div1');
  var div2 = document.getElementById('div2');
  var div3 = document.getElementById('div3');

  div1.addEventListener('click' , function(event){

    console.log('div1 was clicked');

  });

  div2.addEventListener('click' , function(event){

    console.log('div2 was clicked');

  });

  div3.addEventListener('click' , function(event){

    event.stopPropagation();

    console.log('div3 was clicked');

  });



});
