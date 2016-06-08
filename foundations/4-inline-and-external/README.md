# Inline and External Javascripts

## Timings

This lesson should take between 45 and 60 minutes to complete.

## Pre-requisites

* Variables

## This lesson covers

* Inline javascript
* Scripts in the head
* Scripts at the bottom of the body
* External scripts

***

Javascript was built to interact with html. So it makes sense that we would need some way to tell the html which javascript code it should use. There are three ways to do this. As always html and javascript support some things that we really should never do. But we will show you them anyway so you know what's possible.

Open the folder with the starter code in it and open the index.html file.

## Inline javascript

The most basic way to include javascript is "inline". This is where we add javascript directly to elements in the html. Here's an example:

```javascript
<a href="#" onclick="alert('you clicked me')">Click me</a>
```

You'll notice we used an 'onclick' attribute on the a tag. This listens for your click on the link and then runs the code inside the speech marks. You can run any javascript code in here that you like. There are other "listeners" that you can use to determine when to run the code as well.

> DISCUSSION (5 minutes) : Why is this very bad practise?

This is considered to be very VERY bad practise. We want to keep our javascript code separate from our html so that we can reuse either without having to tease it all apart. So seriously don't ever do this. There are no good reasons to do so. It is just a hold over from the evolution of html and javascript.

## Scripts in the head

You can tell your html page that you are writing javascript code by using a script tag.

```javascript
<script>alert("I'm in a script tag")</script>
```

Copy and paste this code just before the closing </head> tag and reload your page. you should see the alert pop up on the page.

> EXERCISE ( 5 Minutes ): Copy the link to your page and open it in a new browser page. When the alert appears don't click ok just yet. Discuss anything you notice about the page. It needs to be a new page otherwise you will continue to see the old one which is already loaded.

Hopefully you should have noticed that because the alert blocks the loading of the page our link doesn't appear until ***after*** we dismiss the alert. This proves a few important things. 

* Scripts are loaded in order
* The head is loaded ***before*** the body

The head is a good place to put scripts that set up your page. Putting the code on the page itself is still considered pretty bad practise. But doing it this way can be good for testing quickly. It is also sometimes used by frameworks and certain 3rd party plugins. 

It has one major downside which is that if your script takes a long time to run or blocks the page the user will not see anything on the page until it's finished. So it's best avoided. A good alternative which is used regularly is the up next.

## Scripts at the bottom of the body

This approach is often used by third party plugins like google analytics and foundation when they want to share code for us to use.

```javascript
<script>alert("I run at the end")</script>
```
Copy and paste the line above to just before the closing </body> tag

Do the same as you did before. Create a new tab with your page in it and see what happens this time.

You should see the following in order:

* The script in the head blocks the page
* The link appears
* The end of body script runs

This is a quite commonly used way of running scripts on the page when the page has finished loading. It still has the drawback of not separating our html and javascript code, however.

## External scripts

### In the head

The best way in most circumstances to include your javascript is to put it in a separate file. Add the following to the head of your index.html just above the other script block.

```html
<script src="library.js"></script>
```
The project already has a file called library.js. Using the "src" attribute we can tell the page to load that file and treat it as javascript. The same rules apply here. If something in our javascript blocks the page it will have to finish before the page will continue to load.

The head is the best place for loading libraries that will be needed by other code on your page. As you can see the library.js file contains a function that we can now use in later code. 

### In the body

We can use external script tags anywhere on the page and you will also commonly see them used by people wanting to share code that should run after the page is loaded just before the end of the body as before. 

Copy the following just above your closing </body> tag

```html
<script src="footer.js"></script>
```

This is a nice way to combine allowing the page to load and keeping our code separate.

If you open the footer.js in sublime you will see that it uses the variables that were in the library.js. 

> QUESTION: Does it matter which is file is loaded first? footer.js or library.js?

Because the footer.js uses a function that were created in the library.js it ***must*** be loaded ***after*** the library.js. But because it blocks the page it is best included at the end of the body.

This is a good example of when to include scripts in the head or at the end of the body.


## Summary

You just:

* Learned how to use inline scripts ( and that you shouldn't ever )
* Learned how to put scripts in the head.
* Learned how to put scripts in the body to wait for the page to load first.
* Learned how to pull in external scripts. This is the best thing to do.
* Learned that scripts must load and run before they continue. So be careful with blocking.
* Learned that order is important when loading scripts!






 

















