# Mongoose Validations

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Mongoose Models

## This lesson covers

* Client side vs Server side
* Basic Validations
* Custom Validations
* Update methods

In the previos lesson we created a model that allowed us to save posts and integrated it with our app. If you've used the app for a bit you may have come across a few small problems.

We have no control over what people type ( or don't type ) in to our form and send through. 

We don't really want a post with no body text and a title that's all numbers. We need to validate that the data people have sense fits our criteria. This is called validation.

In the foundations model we used jQuery to check that people filled out our form correctly. Because this validation is being done in the client's browser it's called client side validation. 

Client side validation has one big problem. It's usually handled by javascript and the user has the option to turn of javascript in the their browser. They could even bypass your form altogether and send data to your server themselves.

For this reason it's very unsafe to only have client side validation. We need to do it on the server too. The user has no control over what happens on our server so it's much safer.

The rule of thumb is this:

* Client side for UX
* Server side for security

In other words client side validations are there to make the user's experience a bit nicer. Tell them they've missed a field before they submit the form.

But the real security lives on the server.

Luckily mongoose has some built in validations and also gives us the ability to write our own.

## Basic validations

Validations are called automatically when we try to save a new object. Let's look at some of the built in validations.

### Required

Perhaps the most basic of ways to validate a field is to make sure that it's not empty. While the terminology for this can vary from platform to platform mongoose calls this "required".

We tell mongoose about our validations in the schema. So let's open the posts model and tell mongoose that a title is required:

```javascript
// create a new schema
var PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: String
});
```

Now that we're giving more information about a field we need to use an object to  pass multiple parameters and we need to be a bit more explicit. Here we're using the built in "required" validation.

Start your app and try to create a new post with a blank title. You should get the following:

```javascript
{
	"message":"Post validation failed",
	"name":"ValidationError",
	"errors":{ 
		"title":{ 
			"message": "Path `title` is required.",
			"name":"ValidatorError",
			"properties": {
				"type":"required",
				"message":"Path `{PATH}` is required.",
				"path":"title",
				"value":""
			},
			"kind":"required",
			"path":"title",
			"value":""
		}
	}
}
```

This JSON object is in fact the "err" object that we told our controller function to return if there was a problem. Look in the posts controller at the create function:

```javascript
...
	// check for errors and return 500 if there was a problem
	if(err) return res.status(500).send(err);
...
```

So this is where mongoose has put our validation error. And now that there is an error we can see that our error message is triggered and the post does not get created.

> NOTE: This is a pretty ugly error and is not exactly what you would want the user to see. There are ways we can use this information to present nicer looking errors that we'll cover in later lessons. Spitting out raw errors like this is pretty bad practise in production because it tells the user a lot about your system. But, for the moment, this is fine. 

Let's make the body text a required field too:

```javascript
// create a new schema
var PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true}
});
```

This time if we submit an empty form we get two errors. Body and Title are both required.

```javascript
{  
   "message":"Post validation failed",
   "name":"ValidationError",
   "errors":{  
      "body":{  
         "message":"Path `body` is required.",
         "name":"ValidatorError",
         "properties":{  
            "type":"required",
            "message":"Path `{PATH}` is required.",
            "path":"body",
            "value":""
         },
         "kind":"required",
         "path":"body",
         "value":""
      },
      "title":{  
         "message":"Path `title` is required.",
         "name":"ValidatorError",
         "properties":{  
            "type":"required",
            "message":"Path `{PATH}` is required.",
            "path":"title",
            "value":""
         },
         "kind":"required",
         "path":"title",
         "value":""
      }
   }
}
```

### String length

Assuming that we've actually entered some values for title and body we can ask mongoose to check to make sure they aren't too long or too short. 

These are actually extremely important checks with text fields. Databases use disk space just like any other type of file. If you allow people to save enormous amounts of text they could very quickly fill up your server with rubbish!

Conversely checking for a minimum length is something we often do for a password. Must be at least 6 characters for example.

Let's say that a post title must be at least 3 characters and that the body can be a maximum length of 1000 characters:

```javascript
var PostSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    minlength: 3
  },
  body: { 
    type: String, 
    required: true,
    maxlength: 1000
  }
});
```

If you enter a short title or a long post body you'll get two new errors now!

> EXERCISE ( 25 Mins ) : Add a new field to the form called rating. Add the field to our schema. The field should be a number that gives a rating out of 10 for the current article. Add validations to make sure the field can only take valid values on both the client side and the server side. You will need to use the mongoose documentation.

The form just needs one new field:

```html
...
<input type="text" name="title" placeholder="Enter a title" value="<%= post.title %>">
<textarea name="body"><%= post.body %></textarea>
 
<input type="number" name="rating" value="<%=post.rating %>" min="0" max="10">

...
```

The min and the max are a simple form of client side validation handled by the browser. Remember it ***can*** be turned off by the user. So it's not secure.

And the schema:

```javascript
var PostSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    minlength: 3
  },
  body: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  rating: {
  	type: Number,
  	required: true,
  	min: 0,
  	max: 10
  }
});
```

### Unique

Unqiue isn't ***strictly*** a validator but we think it makes sense to put it here. It's actually a way of telling the database to not allow two documents to have the same value for a field. It uses database indexes which are different from validators. But let's quitely ignore that...

A good example of this is to make sure two people can't sign up with the same email address in a user object!

Let's make sure that two posts can't have the same name:


```javascript
var PostSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    unique: true,
    minlength: 3
  },
  body: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  rating: {
  	type: Number,
  	required: true,
  	min: 0,
  	max: 10
  }
});
```

Try adding another post with the same name as one already in your database. You'll get a different looking error this time because it's coming from the database and not a mongoose validation. But it's an error nonetheless!

```javascript
{  
   "code":11000,
   "index":0,
   "errmsg":"E11000 duplicate key error collection: posts.posts index: title_1 dup key: { : \"Bobsmith\" }",
   "op":{  
      "title":"Bobsmith",
      "body":"dasfsdf",
      "rating":2,
      "_id":"57d142461f75c698738aa1d8",
      "__v":0
   }
}
```

## Custom validations

If the built in validations aren't enough for you can write your own and mongoose will run them for you.

A validator is just a function that checks your value by whatever criteria you choose and then returns true or false to indicate pass or fail. So to create one we just need to write a function that returns true or false.

Let's write a bad words filter for the body text:

```javascript
...
title: { 
    type: String, 
    required: true,
    unique: true,
    minlength: 3,
    validate: {
      validator: function(value) {
        // need to return true or false in here
      },
      message: 'No rude words please!'
    },
  },
...
```

You can see that our validator functions takes an argument that will contain the value of the field to test. We also have to specify an error message to return if it doesn't pass the test.

Let's see if our body text contains any of the words in a banned words list:

```javascript
...
title: { 
    type: String, 
    required: true,
    unique: true,
    minlength: 3,
    validate: {
      validator: function(value) {

          // list of naughty words
          var banned_words = ['wombat' , 'sparta' , 'bob'];

          // check for each banned word in the body text
          var word = null;
          while(word = banned_words.pop()) {
            if(value.indexOf(word) !== -1) 
              return false;
          }
          
          // none were found, you passed!
          return false; 
      },
      message: 'No rude words please!'
    }
},
...
```

>NOTE : This is hardly a sophisticated way to check for banned words and would be far better achieved with Regular Expressions. But we haven't learned them yet so this is good enough for now.

Try creating a new post with one of the banned words in it. You should see that you get an error this time. Remove the banned word and try again. This time it should pass and the post will be created.

## Update methods

Try editing the post you just created. Put one of the banned words in to the body and change the title to only have 1 character and try saving it.

It worked. Why did it save this time? It saved because mongoose ***doesn't run validators*** on updates by default. And even then it will only run them if we use the "update", "findOneAndUpdate" or "findByIdAndUpdate" methods and specifically tell them to run the validators. 

Open the posts controller and look at the updatePost method. We need to tell mongoose to run the validators.

We tell it to run validations by passing in an options object as a third parameter. We've also tidied things up a bit because it's getting to be a long method call:

```javascript
// UPDATE - UPDATE /:id
function updatePost(req , res) {

    // data is gathered by body parser and placed in req.body
    
    // load, bind and save all in one hit
    Post.findByIdAndUpdate( 
        req.params.id, 
        { $set:  req.body }, 
        { runValidators: true }, 
        function(err , post){
      
      		// check for errors
          if(err) return res.status(500).send(err);

          // redirect the user to a GET route. We'll go back to the INDEX.
          res.redirect("/");
    
        }
    );

}
```


## Summary

You just:

	* learned how to use the built in validators in mongoose to check submitted data
	* learned how to write your own custom validators
	* learned that update methods need to be told specifically to run the validators



