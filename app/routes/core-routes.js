var React = require('react/addons'),
    fs = require('fs'),
    critical = '',
    ReactApp = '',
    ReactHTML = '';

fs.readFile('public/critical.css', 'utf8', function (err,data) {
  if (err) {
    console.log(err);
  }
  
  critical = data;

});

module.exports = function(app) {

    app.get('/', function(req, res){
        // React.renderToString takes your component
        // and generates the markup
        ReactApp = React.createFactory(require('../components/index.js'));
        reactHtml = React.renderToString(ReactApp({}));
        // Output html rendered by react
        // console.log(myAppHtml);
        res.render('index.ejs', {reactOutput: reactHtml, criticalCSS: critical });
    });

    app.get('/index.html', function(req, res){
        // React.renderToString takes your component
        // and generates the markup
        ReactApp = React.createFactory(require('../components/index.js')),
        reactHtml = React.renderToString(ReactApp({}));
        // Output html rendered by react
        // console.log(myAppHtml);
        res.render('index.ejs', {reactOutput: reactHtml, criticalCSS: critical });
    });

    app.get('/speaker/:speaker', function(req, res){
        // React.renderToString takes your component
        // and generates the markup
        var speaker = req.params.speaker;
        ReactApp = React.createFactory(require('../components/speaker.js')),
        reactHtml = React.renderToString(ReactApp({speaker: speaker}));
        // Output html rendered by react
        // console.log(myAppHtml);
        res.render('index.ejs', {reactOutput: reactHtml, criticalCSS: critical });
    });

  };