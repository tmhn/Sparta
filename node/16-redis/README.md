# REDIS

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Node
* Express

## This lesson covers

	* What is redis
	* Installation
	* Basic commands

We've seen a few different ways to store data in previous lessons. They were all good in different situations. Mongo is great for complex relationship and long term peristence, sessions are great for storing little bits of data between requests and cookies are good for storing data about people's behaviour on their own browser. 

Now we're going to look at a data store called Redis. Redis is good when you want data fast because it stores it's entire database in memory. It also backs it up to a disk at the same time so you don't lose it all if the server stops.

This means that it occupies a unique place in the database landscape. Redis is fast. Really fast. So it get's used for everything from caching to full blown data storage.

## Installation

Redis is easy to install with homebrew:

```bash
brew install redis
```	

Very much like mongo we now have access to two programs. One to start the redis server and a client to interact with it.

Let's start the server:

```
$ redis-server


                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 3.2.0 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 60552
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

60552:M 09 Sep 18:53:46.153 # Server started, Redis version 3.2.0
60552:M 09 Sep 18:53:46.153 * The server is now ready to accept connections on port 6379

```

Now that the server is running we'll need to open another terminal to work in. We can connect to the redis-server with the redis client:

```bash
redis-cli
127.0.0.1:6379> 
```

We're good to go!

## Databases

Unlike other data storage system Redis does not name it's databases. They are simply numbered. You can define in the config how many database you will have but the default is 16.

We can see how many we've got like this:

```bash
CONFIG GET databases
1) "databases"
2) "16"
```

As you can see it only tell us how many databases we have available because they don't have names. We have 16.

Selecting a database is easy too:

```bash
SELECT 0
OK
```

## Keys

Every bit of data we set in redis will have a key and a value. Each key should be unique they are just strings. It is very common in Redis to use colons to group various keys together but it is important to remember that they are still just strings. No actual grouping is taking place. 

A simple key for representing our first user might be something like:

"user:1"

Redis will not interperet the colon in any way. An equally valid key might look like:

"user>1"

But colons are most commonly used so it's probably best to stick with that.

They don't have to stop at one colon either. A key that represents the title of the first post of the first user might look:

"user:1:posts:1"

It's really entirely up to you. Redis doesn't treat them as anything but strings.



## Data types

Databases have different data types that are good for storing certain things. Redis has five. They are very simple data types but they can be used in some very clever ways to produce complex results.

Let's examine the data types and how to use them.

### Strings

Strings are really badly named in Redis because they can actually be numbers too. Perhaps a better name would be "variable". They are single variables that have a key and a single value.

Open up the redis cli and type the following to set a simple String:

```bash
SET user:1 "steve"
GET user:1
> "steve"
```

To set a string we use the SET command and to retrieve it we use GET. The first argument for both is the key.

The most important thing when it comes to choosing a data type to use are the method that are available for that data type. 

Remember String are not actually just "Strings" so they have methods for numbers too. Here are a few of them to try. See if you can figure what each one does:

```bash
SET user:1:age 0
INCR user:1:age
GET user:1:age
> "1"

DECR user:1:age
GET user:1:age
> "0"

APPEND user:1 " reid"
GET user:1
> "steve reid"
```

Think carefully about the methods when choosing a data type to work with.

### Hashes

Hashes are pretty similar to JSON objects. They are a simple collection of keys and values

We can access values individually or ask for everything together. To set a hash we use HSET and to retrieve one we use HGET and HGETALL:

```bash
HSET post:1 title "Post 1"
HSET post:1 body "This is some text"
HGET post:1 title
> "Post 1"

HGETALL post:1
> 1) "title"
> 2) "Post 1"
> 3) "body"
> 4) "This is some text"
```

There are a whole bunch of methods available for hashes. You should takes some time to check all the methods out. Here are a few:

HDEL - Delete one or more hash fields
HEXISTS - Determine if a hash field exists
HINCRBY - Increment the integer value of a hash field by the given number
HKEYS - Get all the fields in a hash
HLEN - Get the number of fields in a hash
HMGET - Get the values of all the given hash fields


### Lists

Lists are very much like arrays of strings. You can push a new item on to the start of the list or the end. and retrieve items from 

### Sets


### Sorted Sets




## Summary

You just:
	


	

	



