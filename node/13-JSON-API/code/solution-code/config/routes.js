var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts');
var usersController = require('../controllers/users');
var sessionsController = require('../controllers/sessions');
var postsApiController = require('../controllers/api/posts');


// users
router.route('/users')
      .post(usersController.create);

router.route('/users/register')
      .get(usersController.new);

// sessions
router.route('/sessions')
      .delete(sessionsController.delete)
      .post(sessionsController.create);

router.route('/sessions/new')
      .get(sessionsController.new);

// posts
router.route('/')
      .get(postsController.index)
      .post(postsController.create);

router.route('/new')
      .get(postsController.new)

router.route('/:id')
      .get(postsController.show)
      .put(postsController.update)
      .delete(postsController.delete);

router.route('/:id/edit')
      .get(postsController.edit);

// API section
router.route('/api/posts')
      .get(postsApiController.index)
      .post(postsApiController.create);

router.route('/api/posts/:id')
      .get(postsApiController.show)
      .put(postsApiController.update)
      .delete(postsApiController.delete);

module.exports = router;