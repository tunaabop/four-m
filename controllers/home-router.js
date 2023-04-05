const router = require('express').Router();
const withAuth  = require('../util/withAuth');
const { User, Post } = require('../models');

// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    if (req.session.isLoggedIn) {
      
    }
    res.render('home', { 
      posts, 
      isLoggedIn: req.session.isLoggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }

});
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      isLoggedIn: req.session.isLoggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route render
router.get('/login', (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// signup route render
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign-Up Page' });
});

// profile route render
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      isLoggedIn: req.session.isLoggedIn,
      name: user.username
    });
  } catch (err) {
    res.status(500).json({"some error":err});
  }

});

router.post('/upload', withAuth, async (req, res) => {
  try {
     
  // Handle image upload here (ref source: https://pqina.nl/blog/upload-image-with-nodejs/)
      // get the file that was set to our field named "image"
      const image = req.files;
      console.log(image);
      // if no image submitted, exit
      if (!image) return res.sendStatus(400);
      // if does not have image mime type prevent from uploading
      if (/^image/.test(image.mimetype)) return res.sendStatus(400);
      // move the uploaded image to our upload folder
      image.image_path.mv(__dirname + '/upload/' + image.image_path.name);
      console.log(req.session.user_id);
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
        image_path: image.image_path.name
      });
      // console.log(req.body);
  // Successfully Post
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json({"some error":err});
    } 
});
module.exports = router;
