const router = require('express').Router();
const usersRouter = require('./users-router');
const postRouter = require('./post-router');

// const homeRouter = require('./home-router');

router.use('/users', usersRouter);
router.use('/post', postRouter);
// router.use('/home', homeRouter);
module.exports = router;
