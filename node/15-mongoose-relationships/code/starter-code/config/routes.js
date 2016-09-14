var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts');
var postsApiController = require('../controllers/api/posts');

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