const {comments, user} = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {

        const newComment = await Comment.create({
        comments: req.body.comments,
        post_id: req.body.post_id,
        email: req.session.email,
        });
        
        res.redirect('/post/' + req.body.post_id);
    } catch (err) {
        console.log("You have hit the 400 path " + err);
        res.status(400).json(err);
    }
    });

router.put('/:id', async (req, res) => {
    try {
        const commentData = await comments.update(req.body, {
        where: {
            id: req.params.id,
        },
        });
        if (!commentData[0]) {
        res.status(404).json({ message: 'No comment with this id!' });
        return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await comments.destroy({
        where: {
            id: req.params.id,
        },
        });
        if (!commentData) {
        res.status(404).json({ message: 'No comment with this id!' });
        return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);


module.exports = router;