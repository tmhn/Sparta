# AJAX

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* JSON
* REST and APIs
* jQuery
* Objects

## This lesson covers

* Synchronous and Asynchronous
* Ajax
* jQuery Ajax

AJAX stands for Asynchronous Javascript and XML. It is not actually a technology in it's own right. It's more a collection of technologies that allow us to exchange data between the server and the browser without reloading the page.

You see examples of this everywhere. Facebook items on the wall, message notifications, friend requests, likes; These all use AJAX to communicate without a page reload.

AJAX therefore works very effectively with a REST API. Allowing us to simply ask for data then to update the page ourselves.

We will be building a random joke generator because we're funny like. 

## Synchronous and Asynchronous

The Asynchronous part of AJAX simply means that the requests occur in the background. The user can continue using the page while the request is being sent. So we will be using callbacks just like with event listeners to see when the request has finished and we've got a response. Then we can do something with  the response.

## XMLHttpRequest

Javascript has a built-in object called XMLHttpRequest. This is the part of AJAX which will actually handle making our request. It has many options but it only needs three things. You may recognise some of these from the REST lesson.

* The URL to make the request to
* The HTTP Verb to use
* A callback that handles the response

> NOTE : Don't be fooled by the mention of XML. XML has in most places been superceded by JSON. But the name has stuck. You can actually use XMLHttpRequest to load any type of resource.

Open the index.js in the starter code and copy the following inside the DOM ready function:

```javascript

  // create a new instance
  var request = new XMLHttpRequest();

  // setup a GET request to the chuck norris api
  request.open("GET", "http://api.icndb.com/jokes/random");

  // set the callback function
  request.addEventListener("load", function(){

    console.log(this.responseText);

  });

  // send the request
  request.send();

```

Reload the page. You should notice a few things. Firstly the callback does not fire immediately. It takes time for the request to be made just as it would if you were loading the page directly.

Secondly the response may ***look*** like JSON but it is, in fact, just text. This is because it needs to be decoded into JSON first. We can use a built-in function to do this. Add the following:

```javascript
  // set the callback function
  request.addEventListener("load", function(){

   var data = JSON.parse(this.responseText);
   
   console.log(data);

  });
```

We now have a JSON object that we can work with. You should see in the console that we can inspect the data structure too. Our joke is inside data.value.joke!

## jQuery

As with all things javascript, XMLHttpRequest is OK. But it's a bit wordy. Let's look at the much neater and easier jQuery version.

The same request as above looks like this:

```javascript
$.get('http://api.icndb.com/jokes/random' , function(data){
	console.log(data);
});
```

That's MUCH shorter! You can see that the verb is now the method name. The request is also sent immediately. One of the nicest bits about this though is that jQuery will decode the JSON for us too. So we don't even have to do that.

There are methods for some of the other more commonly used verbs too and a generic ajax method for the others:

```javascript
$.post('http://api.icndb.com/jokes/random', { data : "to send" }, function(data){
	console.log(data);
});

// generic function
$.ajax({
  method: "POST",
  url: "http://api.icndb.com/jokes/random",
  data:  { data : "to send" }
})
.done(function( msg ) {
	alert( "Data Saved: " + msg );
});
```

These functions are extremely well documented on the jQuery website. So have a look.

## Putting it together

Now that we can make a request using ajax and get a response we can use jQuery to do something interesting with it on the page. Let's make our script request a new joke every 10 seconds and display it on the page.

Inside the callback let's grab the element from the DOM that's holding the joke and update it's text with what we got from the ajax request.

```javascript
$.get('http://api.icndb.com/jokes/random' , function(data){
	// grab the joke from the data
	var joke = data.value.joke;
	
	// grab the joke title element and set the html
	$("#joke").html(joke);
});
```

You can see that once we have the data in javascript it's pretty easy to do whatever we want with it.

Now, just for fun, let's make it run every ten seconds.

```javascript
setInterval(function(){

    $.get('http://api.icndb.com/jokes/random' , function(data){
      // grab the joke from the data
      var joke = data.value.joke;
      
      // grab the joke title element and set the html
      $("#joke").html(joke);
    });

  } , 10000) 
``` 

What you have hopefully taken from this lesson is that once you have the data you want you are not limited in what you can do with it. We could have done some crazy stuff with it. Here are some stupid examples:

* Made a typing speed game where people must type out the joke as fast as they can
* Hidden a few words and made a hangman style game
* Put the joke in a form that sends it to the users friends
* Put the joke in a share to facebook button

There are so many ways to use data. This is why APIs are so powerful.
 
## Summary

You just:

*  Learned that AJAX is a collection of technologies used to allow browsers and servers to communicate without blocking
*  Saw how to write an XMLHttpRequest
*  Saw how to use the much easier jQuery version
*  Saw some examples of what you could build with the data once you've got it.









 

















