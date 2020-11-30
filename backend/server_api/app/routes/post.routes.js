const { authJwt } = require('../middleware');
const posts = require('../controller/post.controller.js');
let router = require('express').Router();

module.exports = app => {
  // Create a new post
  // 여기에 이제 authJwt 미들웨어 추가해서 웹토큰 인증한 뒤에 처리할 수 있도록
  // put 이랑 delete 도 똑같이.
  router.post('/', posts.create);
  
  // Retrieve all post
  router.get('/', posts.findAll);

  // Retrieve a single post with id
  router.get('/:id', posts.findOne);

  // Update a post with id
  router.put('/:id', posts.update);

  // Delete a post with id
  router.delete('/:id', posts.delete);

  // Delete all posts
  router.delete('/', posts.deleteAll);

  app.use('/posts', router);
}