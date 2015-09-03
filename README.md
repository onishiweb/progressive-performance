# Progressive Performance

A demo app of progressive enhancement techniques aimed at increasing website performance.

## Features

Progressive performance is a boilerplate app setup aimed at combining progressive enhancement techniques to improve site performance. The app includes:

- Critical Path CSS (via [Penthouse](https://github.com/pocketjoso/penthouse))
- Font Loading API
- Universal JavaScript architecture with [ReactJS](http://facebook.github.io/react/)
- Service worker offline support

## Installation

Clone the git repo - git clone git://github.com/onishiweb/progressive-performance.git - or download it and then rename the directory to the name of your project.

Run `npm install` inside the project directory to install dependencies.

You will also require a few extra things to be installed and working globally on your system.

- [Gulp](http://gulpjs.com/)
- [PhantomJS](https://github.com/ariya/phantomjs)

### Building

The project uses Gulp as a build tool, based on Una's [Gulp starter environment](https://github.com/una/gulp-starter-env) with 3 main tasks:

- `gulp critical` use to generate critical path CSS which will be output to `public/critical.css` by default.
- `gulp build` to run a one-time build of JavaScript, Sass, and image minification
- `gulp` the default task will run the same tasks as build as well as starting browser-sync, and `gulp watch`
