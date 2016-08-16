# Intro to REST and APIs

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* JSON

## This lesson covers

* APIs
* What is REST
* CRUD
* HTTP Verbs
* HTTP Status Codes
* RESTful Routes
* Postman

Let's imagine that you've built an amazing application that collects information about people's contact information. A company approaches you and asks if they can use your data to tie in to their own application and maybe create some data of their own. How would you share this information with them and how would you allow them to create new data? 

They could use the web interface that you built but that won't tie in with their mobile app very easily. HTML is actually pretty clunky for sending data because it has a visual structure attached that we don't need.

You could give them access to your database. But that has a lot of risk attached to it. We could give them a dump of the database in a file and send it over email. But that obviously has practicality issues.

The answer is to create an Application Programme Interface. This is how we decide which parts of our application people are allowed to access and how they will access it. 

We could build an API any way we like. But it would make sense if there was a standardized way to do it. That way everyone would know what to expect when they came to use it. This is where REST comes in.

Before we look at REST we need to understand a bit more of what's been going on behind the scenes.

## Resources

Up until now we've built 

A resource can be absolutely any type of data. It could be a video, an image, some html ( like a webpage ) or like in our example, a JSON representation of some data. This is a good way to think about everything we build as it's roughly  how the internet works anyway.

We make a request and we get a resource as the response. 



## What is REST

REST stands for Representational State Transfer. It is simply a set of expectations that people will have about how your API will work. 

There are guidelines but no real rules to REST.

* Actions to be performed have two parts, a url and an HTTP Verb
* Data is usually represented as JSON or XML. But most often JSON.
* Status codes are used to determine success or failure of an action

There are plenty more guidelines but these are the fundamental ones.


## CRUD

We can build our application to perform any action we think makes sense on our resources but there are some basic things that we nearly always do. 

* Create a new resource
* Read/Show an existing resource
* Update/Change an existing resource
* Delete an existing resource

Each one of these actions will have:

* an HTTP Verb
* a URL
* a status code
* a returned resource



 
## Summary

You just:

*  installed bower
*  used bower to read a manifest and install the packages
*  install some new packages and saved them to manifest
*  learned that we don't save packages in git. Just the manifest.









 

















