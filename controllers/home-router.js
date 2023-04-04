const router = require('express').Router();
const withAuth = require('../util/withAuth');
const { User, Post } = require('../models');

// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

router.get('/', async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ['password'],
        raw: true,
      });
    }
    res.render('home', {
      title: 'Home Page',
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('⛔ Uh oh! An unexpected error occurred.');
  }
});

// login route render
router.get('/login', (req, res) => {
  res.render('login', { title: 'Log-In Page' });
});

// signup route render
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign-Up Page' });
});

// profile route render
router.get('/profile', (req, res) => {
  res.render('profile', { title: 'Profile Page' });
});


router.post('/upload', withAuth, async (req, res) => {
  try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  // Handle image upload here (ref source: https://pqina.nl/blog/upload-image-with-nodejs/)
      // get the file that was set to our field named "image"
      const { image } = req.files;
      // if no image submitted, exit
      if (!image) return res.sendStatus(400);
      // if does not have image mime type prevent from uploading
      if (/^image/.test(image.mimetype)) return res.sendStatus(400);
      // move the uploaded image to our upload folder
      image.mv(__dirname + '/upload/' + image.name);
  // Successfully Post
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    } 
});
module.exports = router;
