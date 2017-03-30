let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let helmet = require('helmet');
// let subdomain = require('express-subdomain');

let router = require('../router');
let app = express();




// allows CORS
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// adds security
app.use(helmet());

// logs requests
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// use the api routes
// app.use(subdomain('api', routes));

app.use('/api', router);
app.use('/static', express.static(path.join(__dirname + '/../static')));
// app.use('/generated', express.static(path.join(__dirname + '/../generated')));

// app.get('/*', function(req, res) {
//   res.status(200).sendFile(path.join(__dirname + '/../static/index.html'));
// });

// if no route is matched return 404
app.use((req, res) => {
  res.status(404).end();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;