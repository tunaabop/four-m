const router = require('express').Router();
const withAuth = require('../../util/withAuth');
const { Post, } = require("../../models");
// This route isn't used by the boilerplate. It has been included to provide an
// example of an api route which requires the user to be authenticated by using
// the withAuth middleware.
router.delete('/:id', withAuth, async (req, res) => {
  console.log("try deleting")
  try {
    console.log(req.session.user_id)
    const postData = await Post.destroy({
      where: {
        post_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
