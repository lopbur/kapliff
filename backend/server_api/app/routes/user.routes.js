const { authJwt } = require('../middleware');
const user = require('../controller/user.controller');
const router = require('express').Router();

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Header',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  
  router.get('/all', user.allAccess);

  router.get(
    '/user',
    [ authJwt.verifyToken ],
    user.userBoard
  )

  router.get(
    '/mod',
    [ authJwt.verifyToken, authJwt.isModerator ],
    user.moderatorBoard
  )

  router.get(
    '/admin',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    user.adminBoard
  )

  app.use('/test', router);
}