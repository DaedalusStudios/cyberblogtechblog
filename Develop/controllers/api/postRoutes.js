const router = require('express').Router();
const { Post, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
        subject: req.body.subject,
        message: req.body.message,
        email: req.session.email,
        user_id: req.session.user_id,
        });
        console.log(newPost.toJSON());
        res.redirect('/dashboard?message=Post created successfully!');
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    });

router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
        where: {
            id: req.params.id,
        },
        });
        if (!postData[0]) {
        res.status(404).json({ message: 'No post with this id!' });
        return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
        where: {
            id: req.params.id,
        },
        });
        if (!postData) {
        res.status(404).json({ message: 'No post with this id!' });
        return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;