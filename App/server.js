// Get dependencies
var _expressPackage = require("express");
var _bodyParserPackage = require("body-parser");
var app = _expressPackage();
const path = require('path');
const http = require('http');

//Here we will enable CORS, so that we can access api on cross domain.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  next();
});

// Get our API routes
const api = require('./server/routes/api');

// Parsers for POST data
app.use(_bodyParserPackage.json());
app.use(_bodyParserPackage.urlencoded({ extended: false }));

// Point static path to dist
app.use(_expressPackage.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
