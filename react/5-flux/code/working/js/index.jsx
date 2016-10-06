var ComponentOne = require('./components/componentOne.jsx');
var ComponentTwo = require('./components/ComponentTwo.jsx');


ReactDOM.render(
  <div className="components">
    <ComponentOne />
    <ComponentTwo />
  </div>, 
  document.getElementById('container')
);