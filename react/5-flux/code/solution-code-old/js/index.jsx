var ComponentOne = require('./components/componentOne.jsx');
var ComponentTwo = require('./components/componentTwo.jsx');
var ComponentThree = require('./components/componentThree.jsx');


ReactDOM.render(
  <div className="components">
    <ComponentOne />
    <ComponentTwo />
    <ComponentThree />
  </div>, 
  document.getElementById('container')
);