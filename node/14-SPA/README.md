# Intro to single page applications

## Timings

This lesson should take between 20 and 30 minutes to complete.

## Pre-requisites

* REST APIs

## This lesson covers

* What are single page applications
* Why build an SPA
* Frontend Frameworks and APIs

Building applications usually involves the same steps:

	* Handle a request ( routing and controllers )
	* Get some data ( models and databases )
	* Render the data ( templates )

In this module we've been building server side applications using node and express. The reason we call it a server side app is because the code on the server handles all the steps above before sending back some HTML for the browser to display.

A Single Page Application is one in which we've shifted some of those responsibilities to the client side ( frontend ). Actually we will be shifting pretty much all of them.

Our routing, controllers and views will now all be handled with javascript code on the frontend.

The only step that the server will handle is managing the data. I.e the models. 

The server side is left with just one route to render. The starting page for our app. After that the client side code takes over handling any requests and rendering the changes.

This why they are called Single Page Applications.


## Why build an SPA

SPAs are very popular. There are some great reasons to build your app this way. Although, as always, they aren't right for ***every*** case. Here are some good reasons to use one.

### Computing power

Code run on the server requires processing power. Which costs money. Especially if your app takes off! There's no real reason why the controllers, views and routing need to be on the server so let's get the user's browser to process it.

### UX

Loading web pages is boring and slow. The whole page needs to be sent. Even bits that were the same on the previous page like headers and footers. And you have an ugly blank screen in the meantime. Especially if the connection is a bit slow ( think mobile apps ).

By getting the frontend javascript to change the page we never leave the current one. We just tweak it. We can show the user some nice loading icons while they're waiting for data and we don't constantly resend things that have already been sent. 

### Reusability

By separating out the delivery of data we can build multiple applications that use the same API. We can make it possible for third party developers to tie in to our data and lots more!

## Frontend Frameworks and APIs

To go from the app we have now to an SPA takes a few steps.

### Create a JSON API

We need to make our data available to the frontend app. Luckily just a few tweaks to what we've already got will turn it in to an API that responds to and returns JSON.

### New Authentication Method

APIs aren't supposed to remember states ( this means logins, sessions cookies etc ). So we'll need a new way to authenticate ourselves to the app from the frontend.

A user "logs in" by requesting a token from the api based on their user credentials. That token then gets sent with every request to prove who you are.

We'll be looking at using JWT Tokens for this.

### Move Routing, Controllers and Views to the frontend

There are many frameworks that are great for handling this sort of thing. Angular and React are arguably two of the most popoular ones. 

We're going to use basic jQuery to recreate our blog app as an SPA and then we'll look at React in the next module.

And that's it. Our app will load a single page after which any changes will be handled by API and frontend javascript.

## Examples

www.pivotaltracker.com is a great example of an SPA. Can you imagine using this platform if every action you took required a page refresh?

facebook is also an SPA. Liking and sharing take place without a page reload. And as you scroll down the page your news feed loads more content. 

## Summary

You just:

	* learned that an SPA is an app where everything but the data is handled by frontend code
	* Saw some of the reasons why you would create your app as an SPA
	* Saw how we'll change our app in to an SPA



	
	


	

	



