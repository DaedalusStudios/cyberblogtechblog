const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment } = require('../models');
const User = require('../models/User');




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
    if (req.session.loggedIn) {

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
  }
  else {
    res.redirect('/login');
  }

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

// redirect to login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  const message = req.query.message;
  res.render('login', { message });
});

router.get('/dashboard', async (req, res) => {
  try {
    const message = req.query.message;
    if (req.session.loggedIn) {
    var myEmail = req.session.email;
    // Fetch a single post by id
    const postData = await Post.findAll({
      include: [
        { model: Comment },
        { model: User,
          where: {
            email: myEmail
          }
        }
      ]
    });

    const posts = postData.map(post => post.toJSON());
    res.render('dashboard', {
      message,
      posts,
      loggedIn: req.session.loggedIn,
    });
  }
  else {
    res.redirect('/login');
  }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
