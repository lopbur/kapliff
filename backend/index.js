const app_api = require('./server_api/server');
const app_view = require('./server_view/server');
const https = require('https');
const fs = require('fs');

const config_api = require('./server_api/conf.json');
const config_view = require('./server_view/conf.json');

app_api.listen(config_api.port, () => {
  console.log(`REST API Server is now listening at port ${config_api.port}.`);
})

app_view.listen(config_view.port, () => {
  console.log(`VIEW Server is now listening at port ${config_view.port}.`);
})

