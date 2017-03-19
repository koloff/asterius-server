let express = require('express');
let app = express();

let config = require('./config/config');
let router = require('./router');

// Bootstrap express with routes
require('./config/express')(app, router);

let port = config.port;
app.listen(port, () => {console.log(`App listening on port ${port}`);});