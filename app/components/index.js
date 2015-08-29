/** @jsx React.DOM */

var React = require('react/addons');

/* create factory with griddle component */
// var Griddle = React.createFactory(require('griddle-react'));

var data = require('../data/themeconf.js').speakers;
var columnMeta = require('../data/columnMeta.js').columnMeta;
var resultsPerPage = 200;

var ReactApp = React.createClass({

      componentDidMount: function () {
        console.log(data);

      },
      render: function () {
        var items = data.map(function (item) {
            return (
                <li className="navigation__item">
                    <a className="navigation__link" href={ item.name }>
                        { item.name }
                    </a>
                </li>
                );
        });

        return (
          <ul className="test">
            {items}
          </ul>
        )
      }
  });


/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;