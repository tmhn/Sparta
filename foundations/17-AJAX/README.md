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

AJAX stands for Asynchronous Javascript and XML. It is not actually a technology in it's own right. It's more a collection of technologies that allow us to exchange data between the server and the browser without reloading the page.

You see examples of this everywhere. Facebook items on the wall, message notifications, friend requests, likes; These all use AJAX to communicate without a page reload.

AJAX therefore works very effectively with a REST API. Allowing us to simply ask for data then to update the page ourselves.

We will be building a random joke generator

## Synchronous and Asynchronous

The Asynchronous part of AJAX simply means that the requests occur in the background. The user can continue using the page while the request is being sent. So we will be using callbacks just like with event listeners.

## XMLHttpRequest

Javascript has a built-in object called XMLHttpRequest. This is the part of AJAX which will actually handle making our request. It has many options but it only needs three things.

* the URL to make the request to
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

We now have a JSON object that we can work with.



 
## Summary

You just:

*  installed bower
*  used bower to read a manifest and install the packages
*  install some new packages and saved them to manifest
*  learned that we don't save packages in git. Just the manifest.









 

















