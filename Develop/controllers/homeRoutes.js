const router = require('express').Router();
const { Post } = require('../models');
//use sessions



router.get('/', async (req, res) => {
  try {
    //order posts by date
    const postData = await Post.findAll({
      order: [['date', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', {
    posts,
    loggedIn: req.session.loggedIn,
    });
    
  }
  catch (err) {
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
