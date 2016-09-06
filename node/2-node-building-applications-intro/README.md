# Building Applications Intro

## Timings

This lesson should take between 30 and 45 minutes to complete.

## Pre-requisites

* Javascript foundations
* Node installed
* Node Intro

## This lesson covers

* What shall we build
* APIs and web applications overview

Now that we know we can build server side applications with Node and run them it begs the question, what shall we build?

Node is a very open and unstructured platform to build on. For this reason we could build almost anything we want, in pretty much any way we want. For this course we're going to focus on building two very common and useful things:

* APIs
* Web Applications
* REST

Because we want other developers to be able to work with us and our code in the future we're also going to adhere to some self imposed rules/guidelines and we'll be using some commonly used tools too.

* REST - Defines what a request and response should look like
* rMVC - Defines how we will structure our code and files
* Express - A structured collection of tools for building web applications
* EJS - A package for rendering responses ( HTML mostly )
* Mongo/Mongoose - How we will save and retrieve data

Just by pulling together these five things we can build some very powerful applications. 

## APIs and web applications overview

We're going to build two types of application that you can interact with over the internet. In other words they will be listening for requests from your browser, or app, or something like postman and they will be sending back a response for you to deal with. These are what we build most often as web developers. 

The most basic example of this is a website. Ask the application for a page and it sends back HTML. Your browser then displays it and allows you to interact with it.

An API is almost identical except that rather than sending back HTML it will send us back some data. Most typically JSON but not always.

The biggest difference between the two is that HTML contains styling and structure about how it should be displayed. That is because it is most commonly displayed in a browser.

An API just gives you raw data with none of the styling. This makes it a lot more versatile but it means that whatever asked for the data has to then decide what to do with it.

An example of an application that doesn't do either of these would be a command line application similar to the one we built in the intro lesson. It doesn't respond to requests or return responses. You run it once from the command line and it finishes after performing it's task.


## Request Response flow

Let's break down a request/reponse in to it's most basic steps. I'll introduce which tools we'll be using to accomplish each part.

### Listen for a request

#### Express

Node doesn't listen for requests from the internet by default. You have to tell it to do that. This is one of the many things Express will do for us. It will open a port on your server and sit there and listen for request to come in before sending those requests on to the next step.

### We have a request. What now?

#### rMVC

Once a request has been received we need to decide what our application will do with it. We'll be using an rMVC structure to keep all the code we'll write neat, understandable and reusable. rMVC stands for:

* Router
* Model
* View
* Controller

##### Router

The router is the directions service for your app.

A router is just a bit of code that handles deciding what function to run for the route ( path and HTTP verb combination ) in the request. An example might be:

"You asked for path '/books' with a GET verb. For that route I'll run this function"

That's it. 

This is where REST comes in. We could have an path/verb combinations we like but we'll be following the REST pattern. The router is where we'll define our RESTful routes.

##### Controller 

A controller is the foreman of your app. 

The functions that the router will run will be in a controller. The job of these functions is to coordinate everything that happens next. A good controller shouldn't actually do any work itself. Although you'll often see badly written ones that do.

The controller should pull together all the tools that are needed to perform the task, tell them each what needs to be done and then send back the fruits of their labour. An example might read: 

"This is what we've been asked to do. ***You*** can get me the data I need. When that data is ready ***you*** can turn it in to HTML for me. When you're both done I'll send it back as a response"

##### Model

Modles are the data managers for your app.

Models handle retrieving, storing and updating data from any source. The bottom line is if you're working with data it should be a model that's doing the work. The most common types of model are the ones that access databases for us. Continuing our example from the controller:

"I need all the users from the database. Let me grab the Users model and ask it to load them all for me."

This is what we will use Mongo/Mongoose for. Mongo is a type of database and mongoose is a model that interacts with it.

##### View

A view is like a decorator.

Views handle turning the data they've been given in to whatever type of response you want to send back. A view might take your list of user data and create an HTML page with all their info in it. The view then gives this HTML back to the controller which sends it back as a response.

> IMPORTANT NOTE: The biggest difference between an API and a web application is the views that are used. The controller and models can be exactly the same. We just render the response differently. An API might have a view that returns JSON and a web app would have one that returns HTML.

The controller might say to a view:

"I've grabbed all this data from the Users model. Can you turn it in to an HTML page for me?" 

This is what we'll use EJS for. EJS is an express package that makes it easier to insert data into templates.

## Summary

To make all this more concrete for you, in our app, the routers, models, views and controllers will have their own files and directories. So don't be surprised when we see a lot of files and folders in a node project. 

Express is just a node module. As are EJS and mongoose. So there will be a lot of moving parts being pulled together. But if you understand what each bit does, it shouldn't be too complicated.

 
## Summary

You just:

* Learned how to use rMVC to structure an app
* Learned what Routers, Models, Views and controllers do and how they interact.
* Learned which node packages we'll be using to make some of this a bit easier
* Learned that the biggest difference between a web application and an API is the views used for rendering












 

















