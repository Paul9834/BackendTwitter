var express = require('express');
var router = express.Router();
const postController = require ('../controllers/post.controller');


/**
 * TASK:
 * CREATE THE ROUTES _________________________________________________________ 
 */


/**
 * POST Route to create user
 */

router.post ('/',postController.createPost);

module.exports = router;
  