const path = require('path');

module.exports = app => {
  const router = require('express').Router();

  router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/server_view', '/public', 'index.html'));
  })

  app.use('/', router);
}