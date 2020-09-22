var express = require('express');
var router = express.Router();
const postController = require ('../controllers/post.controller');


/**
 *
 * POST Route to create user
 *
 */

router.post ('/',postController.createPost);

/**
 *
 * PUT Route to update an user by id
 *
 */
router.put ('/:idPost',postController.updatePost);


/**
 *
 * DELETE Route to delete an post by id
 *
 */
router.delete('/:idPost', postController.deletePost);



module.exports = router;
  