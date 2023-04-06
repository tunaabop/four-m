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
    // Get all posts and JOIN with user data
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
    let name = '';
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findOne({ where: { user_id: req.session.user_id } });
      name = user.username;
    }
    res.render('home', { 
      posts, 
      isLoggedIn: req.session.isLoggedIn,
      name: name
    });
  } catch (err) {
    res.status(500).json(err);
  }

});
router.get('/post/:id', async (req, res) => {
  try {
    console.log("try to render post")
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const post = postData.get({ plain: true });
    // const postData = await Post.findOne({ where: { post_id: req.params.id } });
    // const post = postData.get({ plain: true });
    console.log(post.date_created)
    res.render('post', {
      ...post,
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
  res.render('signup', { title: 'Sign-Up Page', style:"signup.css"});
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
      // res.status(200).json(newPost);
      res.redirect('/');
    } catch (err) {
      res.status(400).json({"some error":err});
    } 
});
module.exports = router;
