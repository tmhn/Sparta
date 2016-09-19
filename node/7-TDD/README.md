# TDD With Mocha/Chai

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Node

## This lesson covers

* TDD
* Mocha/Chai Installation
* Testing the posts routes
* Deciding what to test

The app we've built so far is actually pretty small. But even our little app has   nearly ten files and performs seven different actions. When we make changes it's easy enough for us to test the app and to make sure everything still works.

But even now, we probably wouldn't want to test all seven actions every time we make a change to our code. And without testing can you ***really*** be sure that you haven't broken something?

The answers is no, you can't. That is where automated testing steps in. We need something that will test all the important aspects of our app for us. So that we can test regularly.

TDD stands for test driven development and it fits very well with automated testing. The idea is that before we write a single line of code we write a test. That test should fail. We then write code that makes it pass. Hence, test driven development is development that is driven forward by the tests that you write.

We will be looking at a framework for automating tests, a library for writing tests and expecting answers and then we'll be writing some simple tests for our apps actions.


## Mocha/Chai Installation

You'll often seen Mocha and Chai used together. Mocha is the testing framework. It provides methods for defining, running and logging tests. Chai is what is known as an assertion library. It decides whether a test has passed or failed.

There are many testing frameworks and a huge number of assertion libraries. These are just two that are commonly used together. Let's install them.

We'll install Mocha globally. But we'll install Chai just for this project. We also only want it in the dev environment:

```bash
npm install -g mocha
npm install chai chai-http --save-dev
```

We need to create a new folder to hold the tests that we'll write. It's important to use "test" because that is where mocha will look by default:

```bash
mkdir test
```

We group tests together in to logical sections. Let's create a file to hold them:

```bash
touch test/test-server.js
```

We've created the file structure. We could run our tests now but nothing would happen. Mocha works by pulling our entire app and grabbing hold of any output that it creates. We can then test that output and return the results.

To be able to pull in our app we need to export it from our app.js. It won't effect our app but it means that mocha and chai can access it. Add this line to the very bottom of your app.js:

```javascript
module.exports = app;
```

Our entire app can now be ***required*** in our testing suite. Lets grab chai and a few other bits that we need in the test-server.js file:

```javascript
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect    = require('chai').expect;

chai.use(chaiHttp);

// Give the test suite a name ( collection of tests )
describe('Posts', function() {

});
```

So far we've required the chai assertion framework, chai-http that will make requests for us and two other assertion addons, should and expect.

We've also used the describe method to start a collection of tests. But we still haven't written any tests.

Try running the empty test suite now

```bash
mocha

0 passing (2ms)
```

## Testing the posts routes

Our test suite ran ok but because we haven't defined any tests we get 0 passed.

The first test we'll write will be for making sure that the INDEX route works correctly. We'll need a container for the tests:

```javascript
describe('Posts', function() {

	  // describe a test for INDEX
	  it('should list ALL posts on / GET', function(done) {
	    
	  });
	  
});  

```

The methods are deliberatley written to read like natural english. For this reason the way they are used is different to most things that you'll have seen before. But don't panic. They really are still just javascript objects, methods and variables that have been painstakingly arranged to read like natural english.

The 'it' function describes a test. It takes two arguments. The first is a description of the test that will be printed to the screen during testing. You should be as descriptive as possible when writing these. 

The second argument is a callback function. This is where we'll place our assertions. 

Just like middleware it takes a done method as an argument that we can use to tell mocha when the test is finished.

Let's add some assertions using chai. We'll check to make sure we got a status of 200 and that the page contains "Welcome to the homepage".

```javascript
describe('Posts', function() {

	  // describe a test for INDEX
	  it('should list ALL posts on / GET', function(done) {
	    
	    // create a request manager that uses our app
	    var request = chai.request(app);
	    
	    // send a request
	    request
	      .get('/')
	      .end(function(err, res){
	
		        // check we got a 200 response
		        res.should.have.status(200);
		
		        // and that it's html
		        res.should.be.html;
		
		        // finish the test ( don't forget this! )
		        done();
	        
	      });
	  });
});  
```

We are making a request through our server and getting the response as if we were a browser. This ends up in the res object.

We can then use the "english sentence like" assertion library to say what we expect.

These tests will report internally whether a test passed or failed so we don't need to write any more than what we expect. There are lots of these "assertion" functions.

Re run your tests using mocha. This time it will test our INDEX route and tell you if it passed the tests:

```bash
mocha

listening on port 3000
  Posts
      ✓ should list ALL posts on / GET (42ms)


  1 passing (50ms)
```

We had one test and it passed. 

Let's make sure that the title appears on the page too. We can use the match method and a regular expression to test the contents of the page:


```javascript
describe('Posts', function() {

	  // describe a test for INDEX
	  it('should list ALL posts on / GET', function(done) {
	    
	    // create a request manager that uses our app
	    var request = chai.request(app);
	    
	    // send a request
	    request
	      .get('/')
	      .end(function(err, res){
	
		        // check we got a 200 response
		        res.should.have.status(200);
		
		        // and that it's html
		        res.should.be.html;
		        
		        // does the title display properly
		        res.text.should.match(/Welcome to the homepage/);
		
		        // finish the test ( don't forget this! )
		        done();
	        
	      });
});
```

> EXERCISE (20 Mins): Write a test for the SHOW route. The test should check that the title and body for the first post "/0" are displayed correctly on the screen. It should also check that the response was HTML and gave a response of 200.

You should have something like this:

```javascript
// describe a test for SHOW
  it('should list a SINGLE post on /<id> GET', function(done) {
    chai.request(app)
      .get('/0')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;

        // does the page have the correct post title on it somewhere
        // regex matching
        res.text.should.match(/Post 1/);

        done();
      });
  });
```

Testing the CREATE route needs some creativity.

If we had a model we could create a new object then load the new object ourselves and see if it worked. But we haven't done models yet and all our data is hidden away in our controller.

We can make a post request to the CREATE route to create a new object. Then perform a second GET request to its SHOW page and see if it was created properly:

```javascript
// describe a test for POST
  it('should add a SINGLE post on / POST' , function(done){
      var request = chai.request(app);

      request.post('/')
          .set('content-type', 'application/x-www-form-urlencoded') // set the form encoding type
          .send({'title': 'Test Post', 'body': 'Body Text'}) // the data to be posted
          .end(function(err, res){

            res.should.have.status(200);
            res.should.be.html;

            // we should end up back on the homepage
            res.text.should.match(/Welcome to the homepage/);

            // make another request to make sure it was created
            request
              .get('/3')
              .end(function(err, res){

                  res.should.have.status(200);
                  res.should.be.html;

                  // was the post correctly created
                  res.text.should.match(/Test Post/);
                  res.text.should.match(/Body Text/);

                  done();
              });
            
          });

  });
```

We can do something similar for UPDATE too:

```javascript
// describe a test for PUT
  it('should update a SINGLE post on /<id> PUT' , function(done){

    var request = chai.request(server);

    request.put('/2')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({'title': 'Updated Post', 'body': 'Updated Text'})
        .end(function(err, res){

          res.should.have.status(200);
          res.should.be.html;
          res.text.should.match(/Welcome to the homepage/);

          request
            .get('/2')
            .end(function(err, res){

                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Updated Post/);
                res.text.should.match(/Updated Text/);

                done();
            });
          
        });

  });
```
Delete is a little trickier. Let's try and delete the last post then check for a 404 when we try to load it:

```javascript
it('should delete a SINGLE post on /<id> DELETE' , function(done) {

    var request = chai.request(server);

    request.delete('/3')
        .end(function(err, res){

          res.should.have.status(200);
          res.should.be.html;
          res.text.should.match(/Welcome to the homepage/);

          request
            .get('/3')
            .end(function(err, res){

                res.should.have.status(404);
                done();

            });
          
        });

  });
```

We now have a decent test suite as a good starting point. But there are many good reasons why these tests might fail when we expect them to pass or vice versa. That is why you need to be continually updating and improving your tests to cover new circumstances. In TDD the tests are just as, if not more, important than the code.

Run your tests now. You should get 5 passes:

```bash
mocha

Posts
    ✓ should list ALL posts on / GET (45ms)
    ✓ should list a SINGLE post on /<id> GET
    ✓ should add a SINGLE post on / POST
    ✓ should update a SINGLE post on /<id> PUT
    ✓ should delete a SINGLE post on /<id> DELETE


  5 passing (106ms)
```

We can now make any changes we like to our app. Safe in the knowledge that if our test suite passes, we probably haven't broken our app.

We can also use mocha to automate the testing a reporting of errors. So it fits very nicely in to our deployment lifecycle.


## What should I test for

Choosing which things to test is a fine art. In an ideal world we would aim for full code coverage ( every aspect of our code being tested ). But this isn't always practical.

So we need to pick the most important things to test first. There is no right and wrong but there is a good rule of thumb:

Test anything that would costs you money, time or customers if it was broken.

A user not being able to login is probably more damaging to your app than them not being able to see your logo.




## Summary

You just:



















 

















l