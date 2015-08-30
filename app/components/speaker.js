/** @jsx React.DOM */

var React = require('react/addons');
var data = require('../data/themeconf.js').speakers;

var ReactApp = React.createClass({

      componentDidMount: function () {
        // console.log(data);
        // console.log(this.props);
      },
      render: function () {
        return (
          <h1>{ this.props.speaker }</h1>
        )
      }
  });


/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;