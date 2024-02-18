const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, comments } = require('../models');
const user = require('../models/user');




router.get('/', async (req, res) => {
  try {
    // Fetch posts with comment count
    const postData = await post.findAll({
      order: [['date', 'DESC']],
      include: [{
        model: comments,
        attributes: [],
        required: false,
        freezeTableName: true,
      }],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('comments.post_id')), 'commentCount'],
        ],
        freezeTableName: true,
      },
      group: ['post.id'], // Group by post id to count comments per post
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
    console.log(`This is the failure: ${req.session.email}`);
    // Fetch a single post by id
    const postData = await post.findByPk(req.params.id, {
      include: [
        { model: comments }
      ]
    });
    const post = postData.toJSON();
    res.render('singlePost', {
      post,
      loggedIn: req.session.loggedIn,
      sessionEmail: req.session.email
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
    const userData = await user.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
)

router.get('/login', (req, res) => {
  try {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  const message = req.query.message;
  res.render('login', { message });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/dashboard', async (req, res) => {
  try {
    const message = req.query.message;
    if (req.session.loggedIn) {
    var myEmail = req.session.email;
    console.log(myEmail);
    
    const postData = await post.findAll({
          where: {
            email: myEmail
          },
    });

    const posts = postData.map(post => post.toJSON());
    res.render('dashboard', {
      message,
      posts,
      sessionEmail: req.session.email,
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

router.get('/editPost/:id', async (req, res) => {
  try {
    if (req.session.loggedIn) {
    const postData = await post.findByPk(req.params.id);
    const post = postData.toJSON();
    res.render('editPost', {
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

router.get('/post', (req, res) => {
  if (req.session.loggedIn) {
    res.render('post', {
      loggedIn: req.session.loggedIn,
    });
  }
  else {
    res.redirect('/login');
  }
}
);

module.exports = router;
