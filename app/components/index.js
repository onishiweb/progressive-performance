/** @jsx React.DOM */

var React = require('react/addons');
var data = require('../data/themeconf.js').speakers;

var ReactApp = React.createClass({

      componentDidMount: function () {
        // console.log(data);
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