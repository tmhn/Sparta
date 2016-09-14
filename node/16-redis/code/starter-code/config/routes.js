var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts');

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

module.exports = router;