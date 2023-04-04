// new post upload routes here
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

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