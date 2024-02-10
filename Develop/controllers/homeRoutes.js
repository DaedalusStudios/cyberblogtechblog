const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment } = require('../models');
//use sessions



router.get('/', async (req, res) => {
  try {
    // Fetch posts with comment count
    const postData = await Post.findAll({
      order: [['date', 'DESC']],
      include: [{
        model: Comment,
        attributes: [], // Exclude other comment attributes, we only need the count
        required: false, // Use left join to include posts without comments
      }],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('Comments.post_id')), 'commentCount'],
        ],
      },
      group: ['Post.id'], // Group by post id to count comments per post
    });

    const posts = postData.map(post => post.toJSON());
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    // Fetch a single post by id
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: Comment }
      ]
    });

    const post = postData.toJSON();
    res.render('singlePost', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
)

module.exports = router;
