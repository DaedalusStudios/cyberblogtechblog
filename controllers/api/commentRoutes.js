const {Comments, user} = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const newComment = await Comments.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        email: req.session.email,
        });
        
        res.redirect('/post/' + req.body.post_id);
    } catch (err) {
        var message = encodeURIComponent('Error creating comment');
        //res.redirect(`/login?message=${message}`);
        res.status(500).json(err);
    }
    });

router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comments.update(req.body, {
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
        const commentData = await Comments.destroy({
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
        res.status(500).json({ message: `err` });
    }
    }
);


module.exports = router;