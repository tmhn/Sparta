# Components

## Timings

This lesson should take between 45 and 90 minutes to complete.

## Pre-requisites

* Intro to react

## This lesson covers

* Thinking in components

React encourages us to think in components. It encourages us to separate our page in to blocks. Even more so than we did when we looked at partials, views and layouts in express ejs.

The idea behind a component is that it should be self contained. It holds it's own template, it's own logic and it manages it own data. 

This is obviously a bit of a departure from what we've been trying to do so far. But it has it's advantages. We are building Lego blocks. Lego blocks that can be reused anywhere with minimal fuss. So let's build some:

## Creating a component

We need to include react in our code. As always we can get the code from many sources but we'll use bower:

```bash
bower install --save react
```

The react script comes in two parts. We need to include them both. Add the following to the <head> tag:

```html
<script src="bower_components/react/react.min.js"></script>
<script src="bower_components/react/react-dom.min.js"></script>
```

These two scripts give us two objects to use in javascript. React and ReactDOM.

We can create a component using React and then render it using ReactDOM. Let's create a simple component in the components.js file:

```javascript
var NavBar = React.createClass({
  render: function() {
    return (
      <div className="nav-bar">
      		<ul>
      			<li><a href="http://www.google.co.uk>Google</a></li>
  			</ul>
      </div>
    );
  }
});
```


