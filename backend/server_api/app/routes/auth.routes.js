const { verifySignUp } = require('../middleware');
const auth = require('../controller/auth.controller');
const router = require('express').Router();

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Header',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  router.post(
    '/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    auth.signup
  );

  router.post(
    '/signin',
    auth.signin
  );

  app.use('/auth', router);
}