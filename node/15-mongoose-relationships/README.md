# Mongoose Relationships

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Mongoose Models

## This lesson covers

* Modelling
* Types of relationship
* Embed or Reference
* Populate

Relationships describe how two models are related to each other and how that relationship will be stored. It effects both the structure of the model and the database.

The process of figuring out how we'll describe the relationships is called modelling. There are a few ways that objects can be related to eachother. You will need to decide which one best fits your use case.

As well as having a type a relationship should also have a descriptive name. That way the developer knows not only ***how*** the objects are related but ***why*** as well.

## Types of relationship

There are three standard relationship types and a few variations on those. Different frameworks and languages may refer to them differently but they are most commonly called OneToOne, OneToMany, ManyToMany.

The most important thing to remember about these relationships and modelling is that there is no right or wrong answer. You should choose the relationship that best fits what you're building. Sometimes the choice will be pretty clear though.

### OneToOne

This is the simplest relationship you can have between two objects. A good example of a OneToOne relationship would be the relationship between a user and their passport. 

We can check that it should be a OneToOne relationship with the following statement:

* User can have one and only one passport - true
* Passport can belong to one and only one User - true

OneToOne relationships are quite rare because there aren't that many good reasons to separate out the data in to two separate objects. In most cases you would simply put all the passport fields in to the user object. But it can have it's uses. 

You may for example want to encrypt all the data in the Passport object but not in the User object. So in this case it would make sense. 

We will be aiming to be able to do the following in javascript when we load our objects:

```javascript
var user = getSomeUser();

// ask for passport details
console.log(user.passport.issue_date);

// and vice versa
var passport = getSomePassport();

// ask for user details
console.log(passport.user.name);
```

### OneToMany

One to many relationships are far more common. A user and their blog posts are a good example.

Here's how to check:

* A User can have many Posts
* A POst can belong to one and only one User.

In javascript it would look something like this:

```javascript
// get a school
var school = getSomeSchool();

// school would have an array of classroom objects
var classroom1 = school.classroom[0];
console.log(classroom1.name);

// you should also be able to ask a classroom about it's school
var classroom2 = getClassroomTwo();

// what school are you
console.log(classroom2.school.name);
```

### ManyToMany

Sometimes it can be difficult to decide whether you should use OneToMany or ManyToMany. Often it will depend on your app. But a pretty solid example would be a post and tags.

* A Post can have many Tags
* A Tag can have many Posts

This relationship implies arrays on both objects:

```javascript
// grab a post
var post = getAPost();

// which tags does the post have?
for(var i = 0; i < posts.tags.length; i++) {
	
	// grab a tag from the list
	var tag = posts.tags[i];
	
	// print the tag name
	console.log(tag.name);

}

// same the other way
var tag = getATag();

// now can see all the posts that have that tag
for(var i = 0; i < tag.posts.length; i++) {
	
	// grab a post from the list
	var post = tag.posts[i];
	
	// print the post name
	console.log(post.title);

}

```

### Special Cases

There are some other special cases of these relationships. A very common one is used for creating friendships between users like facebook.

> EXERCISE (10 Minutes) : Try to find on Google the relationship commonly used for creating friendship. Think about which of the statements above would fit.

It's actually known as a ManyToMany Self referencing relationship. The self referencing occurs because it's a relationship between two of the same type of object. In this case Users to Users. We can check it's a many to many like this. ( Note that a friend is still a User object. Friend is the name of the relationship ) :

* A User can have one or more friends
* A User can have one or more friends

Seems a bit redundant saying it twice but it's a good way to prove that it's self referencing.

> QUESTION ( 5 Minutes ) : Can you think of examples for OneToOne and OneToMany self referencing relationships?

A OneToMany self referencing is most commonly seen with parent-child relationships of the same object. So a good example might be Categories:

* A Category can contain one or more child Categories
* A Category has one and only one parent Category

OneToOne self referencing is pretty rare but can be really powerful. An article revision system could use it like this:

* An article can have one and only one update ( still an article )
* An update can have one and only one parent article

## Uni-directional and Bi-directional

These terms are really about whether we have properties on both objects to access the other side of the relationship. 

All of our examples above are bi-directional. I can ask the post for the user and the user it's post.

We can set it up so that we could ***only*** ask the user for it's posts but not the post for it's user ( or the other way round ).

That is uni-directional. 

Setting up bi-directional relationships is usually pretty time consuming so that's the first reason why it might be best to stick with a uni-directional if you don't need anything more than that.

They also require extra work in terms of maintaing the relationship so there's another good reason.
 

## Embed or Reference

Now that we know what we're aiming for we can have a look at how to get mongoose to do it for us. 

There are two ways to create relationships in mongo. You have a choice of saving all the data, different object type and all, into one document. This is called embedding. 

We can also work in a more RDBMS way by giving your document the IDs of all the other documents that it then needs to load as well. This is referencing.

Mongoose handles it relationships in the Schemas. We have two schemas to work with User and Post.

### References

In our app the posts are loaded and viewed independently of the the users. So it's a good example of when referencing might be a better way to create an association.

To create an association we simply pass one schema in to the other and mongoose does the rest.

Open the User model and we'll add our relationship to the schema:

```javascript
var mongoose = require('mongoose');

// get a reference to the mongoose Schema type
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({

  first_name : {type: String, required:true},
  last_name : {type: String, required:true},
  email : {type: String, required:true},
  password : {type: String, required:true},
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

});

module.exports = mongoose.model('User' , UserSchema);
```

The schema has special syntax. The posts line tells mongoose that there will be an array of ObjectIds. The ref tells mongoose which Model it should point to.

Let's create the opposite reference for the posts object:

```javascript


```


### Reference

## Populating References




## Summary

You just:

	* learned how to use the built in validators in mongoose to check submitted data
	* learned how to write your own custom validators
	* learned that update methods need to be told specifically to run the validators



