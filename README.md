1. npm install
2. Configure TSLINT

# Useful commands:
npm outdated // get list of outdated packages
npm update // Updates ALL packages

# Overview package.json:
// typescript
// ---------

"typescript": "^2.6.1", // strong typing
"tslint": "^5.8.0", // linting typescript
"tslint-config-airbnb": "^5.3.0", // airbnb set of rules for tslint
"@types/node": "^8.0.51", // fixes webstorm errors (fixes require() etc)
"tslint-config-airbnb": "^5.3.0", // premade rules for tslint

// webpack
// ---------
// bundler
"webpack": "^3.8.1", 

// live reload while developing
"webpack-dev-server": "^2.9.4" 

// webpack needs this to load .ts files
"awesome-typescript-loader": "^3.3.0", 

// webpack needs this to load .css files
"css-loader": "^0.28.7", 

// webpack needs this to load .html files
"html-loader": "^0.5.1", 

// webpack needs this to load .jpgs and other images
"file-loader": "^1.1.5",

// The angular2-template-loader searches for templateUrl and styleUrls declarations inside of the Angular 2 Component metadata 
// and replaces the paths with the corresponding require statement. 
"angular2-template-loader": "^0.6.2", 

// Adds CSS to the DOM by injecting a <style> tag
"style-loader": "^0.19.0",

// SCSS support
"node-sass": "^4.7.1",
"sass-loader": "^6.0.6",

// A loader for webpack that lets you import files as a string.
"raw-loader": "^0.5.1",

// This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
// This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. 

// Extract text from a bundle, or bundles, into a separate file. (Inline css -> style.css)
"extract-text-webpack-plugin": "^3.0.2",

// fixes ' Critical dependency: the request of a dependency is an expression' error on compilation
ContextReplacementPlugin

// Allows to merge common webpack config with dev / production or test config
"webpack-merge": "^4.1.1"

// Angular
// ---------

// Adds ngClass etc.
@angular/common": "^5.0.1",

// To run Angular app in the browser
"@angular/platform-browser": "^5.0.1",
"@angular/platform-browser-dynamic": "^5.0.1",
"@angular/compiler": "^5.0.1",

// Support for observables
"rxjs": "^5.5.2",

// Support for routes
"@angular/router": "^5.0.1",

// Polyfills
"core-js": "^2.5.1",

// Angular's change watcher
"zone.js": "^0.8.18"

// Request handler
"@angular/http": "^5.0.1",

// IDE
// ---------
// static code analysis (lint errors inside IDE)
"codelyzer": "^4.0.1",

# Important files
tsconfig.json // typescript compiler options (example: target js version -> ES5)
custom-typings.d.ts // typescript needs to know what variables names are allowed (for example that global variable ENV exists)