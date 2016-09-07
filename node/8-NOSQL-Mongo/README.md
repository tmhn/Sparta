# NOSQL

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Homebrew installed

## This lesson covers

* Databases
* RDBMS vs NOSQL
* Mongo
* The ObjectId

In our lessons on creating web applications with Node we've created an application that can create, read and update posts. These posts have been stored in an array that has, so far, lived in our controller.

This has worked perfectly well except for one major flaw. Whenever the application is restarted the array is reset. In other words, any changes we make do not ***persist***. Databases are all about persitence. Can we save data that will last if our application is restarted, if the server is shut down, if the application crashes etc.

Databases are really just programs like any other we've used. Except these one store and retrieve data. Some databases can be set up like web servers to respond to requests over the internet and these are the ones we'll be looking at.

It probably won't surprise you to learn that there are hundreds of different databases that exist. In this lesson we'll be talking about two of the most popular ***types*** of database, Relational and NoSQL and then we'll focus on NoSQL with a database called Mongo.

## RDBMS vs NOSQL

Let the terminology begin...

### RDBMS

Relational DataBase Management Systems have been around for a very long time. It's probably fair to say that the vast majority of databases used today are RDBMS. They have a very specific way of storing and retrieving data that is primarily concerned with how data items ***relate*** to each other. It's not nearly as complicated as it sounds. 

We won't be covering RDBMS in much detail in this lesson but understanding how they work at a basic level is extremely helpful in understanding why the alternative ( NOSQL ) was created.

#### Storing data

Data is stored in a format very similar to an Excel spreadsheet ( don't tell anyone I said that ). It works something like this:

* A database is a collection of tables
* Tables are essentially spreadsheets
* Tables contain rows and columns

Let's use our list of posts from the application as an example of how we might store them in an RDBMS:

Each post had three fields:

```javascript
{
	id: 1,
	title: "Post 1",
	body: "This is the first post"
}
```

The process of turning this into a database structure is called "Modelling". So how would we model this data:

*  We might have a database called blog for example
*  The database would have a table called posts
*  The post table would have columns that had the same names as all the properties of a post object.
*  Each row in the table would represent a post and would have a unique ID.

Our posts table might look something like this:

| ID | title  | body                    |
|----|--------|-------------------------|
| 1  | Post 1 | This is the first post  |
| 2  | Post 2 | This is the second post |
| 3  | Post 3 | This is the third post  |

#### Retrieving data

RDBMSs typically use a language called SQL to ask the database for data. SQL stands for Structured Query Language. It is an extremely powerful way to ask the database for very specific things. We won't be learning SQL in this lesson but here are a few examples:

```sql
// get all the posts from the posts table ( would map to an array of objects )
SELECT * FROM posts

// get a single post with a specific ID ( would map to a single object )
SELECT * FROM posts WHERE id = 1

// get just the title from the third post
SELECT title FROM posts where id = 1

// Find all the posts with the word post in the body
SELECT * FROM posts WHERE body LIKE '%post%'
```
#### Relationships

Let's make our posts slightly more complicated. Let's say that we now also want to store users for our application. We could easily create a new "users" table to store the information which might look like this:

| ID | name  | age                      |
|----|--------|-------------------------|
| 1  | Steve  | 32                      |
| 2  | Bob    | 999                     |

How could I change either of these tables to include information about which user wrote which post?

This is the biggest difference between RDBMS and NOSQL. How they handle ***relationships*** between data.

It's actually pretty simple to do in this case. We could add another column to our posts table which contained the ID of the user that created it.

| ID | title  | body                    | user_id |
|----|--------|-------------------------|---------|
| 1  | Post 1 | This is the first post  | 1       |
| 2  | Post 2 | This is the second post | 2       |
| 3  | Post 3 | This is the third post  | 1       |

Hopefully, it's pretty clear that the first and third posts were created by user 1 and the second post was created by user 2.

The beauty of this is that there are many packages out there that can ask our database for a single user, for example, then ask for all that user's post and then package it all up together into a nice useable object. In javascript it might look like this:


```javascript
{
	id: 1,
	name: "Steve",
	age: 32,
	posts: [
		{
			id: 1,
			title: "Post 1",
			body: "This is the first post"
		},
		{
			id: 3,
			title: "Post 3",
			body: "This is the third post"
		}
	]
}
``` 

There are other more complex relationships that we can create that we won't go in to just yet. 

The rule to learn here is that RDBMS databases can't store complex data ( arrays , objects etc ) in a single table. We need to spread them across multiple tables and link them back with IDs.

This has some pretty big upsides but also some downsides. When you have lots of objects that are related to each other in different ways there's nothing better than an RDBMS.

### NoSQL

NoSQL is exactly what it sounds like. It's a database that doesn't use SQL. Hence No SQL. That is, perhaps not the best way to think of the difference between the two though.

The biggest difference is that NoSQL ***can*** store complex data. Rather than spreadsheets with rows and columns it's probably easier to think of NoSQL as storing JSON objects in "documents".

This isn't always exactly true but it's a good clean way to think of it. You can throw almost any data you like at a NoSQL database and it will just handle it. That sounds great. But just like RDBMSs it has some upsides and some downsides.

A typical NoSQL structure looks like this:

* A database contains collections
* A collection contains documents
* A document can contain any data ( think JSON )
* Documents in the same collection don't have to have the same structure ( huh? more later )

Using our posts example from before might look like this:

* We still have a database called blog
* We have a collection called posts
* The posts collection would contain many post documents
* Each post document is essentially an object that has a title, a body and an ID for that document

We could also do the same thing for users. So where is the difference? The difference really comes when we decide how to handle the relationship between users and posts.

With NoSQL we could ***embed*** each users posts inside their user document. That way we only need to load the user and we get all their posts too without querying any other collections. So the document would actually contain all the information about that user including their posts like this:

```javascript
{
	id: 1,
	name: "Steve",
	age: 32,
	posts: [
		{
			id: 1,
			title: "Post 1",
			body: "This is the first post"
		},
		{
			id: 3,
			title: "Post 3",
			body: "This is the third post"
		}
	]
}
``` 

This would obviously make it easier to get all our data for a single user.

So why isn't this always amazing? Well if we decided to set up our database like this doing something like retrieving all the posts on the blog would involve:

* Loading every user
* Looping through each one a getting their posts
* Creating a new array from all the posts. 

Not exactly efficient.

NoSQL can also handle relationships the same way an RDBMS by storing ids as references to another document but it's not nearly as good at it.

The bottom line is, use the right tool for the right job. Embedding data might seem easier but it isn't always.

## Mongo

Mongo is one implementation of NoSQL. There are quite a few others but Mongo is the most popular one to use with Node. There are many excellent packages for working with Mongo databases available for node too.

Mongo stores data as BSON which is Binary JSON. At this stage it's perfectly fine to think of it as JSON. The binary part just refers to how it's stored.

Mongo is a server, in many ways, just like express. It will listen for requests and return responses over the internet ( if we set it up that way ). It also has a command line program that we can use for working with it.

You are going to install mongo on your machine so that your it acts as a database server. 

### Terminology

Let's clear a few things up before we start:

* Mongo - The name of the database program
* mongod - ( not at type ) the database program that runs on your machine to provide the server
* mongo - the command line program that we use to interact with the server

### Installation

There are quite a few ways to install mongo. If you're not using a Mac you'll need to look up the instructions for your platform. We're going to install it with Homebrew.

> NOTE : Expect installation to take up to 30 mins for the entire class. Different settings on different machines can cause problems. If you don't have Homebrew installed take some time and install it now. You may need administrator access on your machine to do this.

Open your terminal and type the following:

```bash
brew install mongodb
```

This may take a minute or two to install.

Once that has finished installing we need to create a directory for mongo to store it's databases in:


```bash
mkdir -p /data/db
``` 

Now we're ready to fire up mongod for the first time. Type the following in to the terminal:

```bash
mongod
```

If all goes to plan you should see a lot of start-up script. The last line should like something like this:

```bash
2016-09-07T16:04:30.196+0100 I NETWORK  [initandlisten] waiting for connections on port 27017
```

We now have a mongo server listening on port 27017!

### The command line

You will need to leave this program running in your terminal window. So let's open another terminal window to work with using ``CMD + T``.

We can now use the mongo command line program to start working with our database. Run the mongo program and you should see the following:

```bash
mongo
MongoDB shell version: 3.2.1
connecting to: test
> 
```
You are now in the mongo prompt. It's ready for you to start writing some commands. 

Mongo may not use SQL commands to search and create things but it does have it's own language. Let's run through some of the common things you'll do.

#### List all databases

Which databases are on my server? Easy.

```bash
> show dbs
test                                0.000GB
mydb								0.000GB
```
You may only have the test database in your list. You may have others. 

#### Open or create a database

If we want to work with a database we have to tell mongo that. If you haven't got one to open that's ok. The same command will also create new one with that name!

```bash
> use mynewdatabase
switched to db mynewdatabase
```

> NOTE : List all the databases again with show dbs. Your new database isn't there! Mongo only really creates it when you put some data in it.

#### Create a new document

If you remember from earlier in the lesson our hierarchy looks like this:

Database
Collections
Documents

So why haven't we started with creating a collection? The answer is that Mongo does this "creating when used" thing a lot. So to create a collection we just have to create a document in a collection that doesn't exist yet.

You may start to notice that Mongo syntax is basically javascript. That should make things a lot easier.

Let's create a new document and collection at the same time:

```bash
> db.users.insert({name: "steve");
WriteResult({ "nInserted" : 1 })
```

We have access to a ``db`` object which is the database we're currently ***using***. The next property is the collection name. Finally we have the insert command which takes a JSON object as the data to insert.

So the command above does the following:

* Look for a collection in the database called users
* If it doesn't exist create it
* Insert an object in to the users collection with the data provided
* Report the results of that saying that one document was successfully inserted

> EXERCISE ( 5 Mins ) : Insert two more users in to the users collection. Give one user a name and an age of 34 and the other an age of 26.

In an RDBMS we wouldnt be able to have two items in the same table that had a different structure. But we said earlier that because each document is self contained we can have two different structures in the same collection. That's why we can have one user with an age and another without.

This can be very useful but mostly it's something we want to avoid.

#### List all collections in a database

Now that we have a collection let's list them all for the current database:

```bash
> show collections
users
```

#### Searching for documents

Let's list all the users in our users collection:

```bash
> db.users.find();
{ "_id" : ObjectId("57d02f7cd3847304c39fdd9d"), "name" : "steve" }
{ "_id" : ObjectId("57d031d5d3847304c39fdd9e"), "name" : "bob", "age" : 32 }
{ "_id" : ObjectId("57d031d5d3a4frafafsdfasd"), "name" : "tim", "age" : 26 }
``` 

Running the find command without any parameters will retrieve every document. But we can be more specific. Let's search for all the users with the name Steve. 

> HINT : It's a case-sensitive search

```bash
> db.users.find({name: "steve"});
{ "_id" : ObjectId("57d02f7cd3847304c39fdd9d"), "name" : "steve" }
```

Now let's find everyone that's over 30. Sigh:

```bash
> db.users.find({ age: { $gt : 30 } });
{ "_id" : ObjectId("57d02f7cd3847304c39fdd9d"), "name" : "steve" , "age" : 32 }
```

Or less than 30:

```bash
> db.users.find({ age: { $lt : 30 } });
{ "_id" : ObjectId("57d031d5d3a4frafafsdfasd"), "name" : "tim", "age" : 26 }
```

#### Updating a document

This is where things get really fun. Updating is a combination of, first, searching, then updating. If you get your search wrong you can end up changing a lot more than you intended!

Let's search for steve again and make him a little younger:

```bash
> db.users.findOneAndUpdate( {"name" : "steve"} , { $set: {age: 29} } );
{ "_id" : ObjectId("57d02f7cd3847304c39fdd9d"), "name" : "steve" }
```

The first object gives the criteria to search by. The second describes how the object should be updated.

Let's try to increase the age of everyone under 40 by 1 ( hint this might not work ):

```bash
> db.users.update({ "age" : { $lt: 40 } } , { $inc: { "age" : 5 } });
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

If you look at your documents now you'll notice that only one of them has changed. Update is a very general function that takes a lot of options. 

By default it only updates the first document that it finds for a query. So we need to tell it to update them all by passing some options as a third argument:

```bash
> db.users.update({ "age" : { $lt: 40 } } , { $inc: { "age" : 5 } } , {multi : true});
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 })
```

That's better. It matched and updated two documents this time.

#### Deleting a document

Deleting is much like updating. We need to find oen first then we can delete it:

```bash
> db.users.deleteOne({ name: "bob" });
{ "acknowledged" : true, "deletedCount" : 1 }
```

There are many, many more ways we can interact with mongo. All the different functions are listed in the documentation.

It's important to note however that it's actually rare that we'll work with mongo in this way. We're far more likely to use a node package or similar that will interact with the database for us.

It is still good to know how to access the database directly. If only so that you can check whether your documents are being created correctly.

## The ObjectId

You have hopefully noticed that each document has a very ugly looking id like this:

```javascript
{ _id: ObjectId("57d02f7cd3847304c39fdd9d") }
```

Each document gets a unique id generated for it by mongo when it's created. While we can query for documents by searching for names, ages and other stuff. ids are the most accurate and fastest way to get a document.

You can set your own ids if you don't like the look of the ones mongo creates but then you are responsible for making them unique. Which is not as easy as it sounds.

## Summary

You just:

	* Learned some of the differences between RDBMSs and NoSQL Databases
	* Learned some of the reasons why you would use one over the other
	* Installed Mongo server
	* Learned some of the basic commands of creating, reading, updating and deleting documents in mongo.
	* Learned what a unique ID is useful for


















 

















l