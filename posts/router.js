const express = require('express');
const DB = require('../data/db');

const router = express.Router();

/**
 * Create post
 */
router.post('/', (req, res) => {
    const post = req.body;

    if(!post.title || !post.contents) {
        res.status(400).json({ error: "Please provide title and contents for the post." });
    }
    else {
        DB.insert(post).then(inserted => {
            res.status(201).json(inserted);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
    }
});

/**
 * GET posts
 */
router.get('/', (req, res) => {
    DB.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

/**
 * GET post by id
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;

    DB.findById(id).then(post => {
        if(!post.length) {
            // 404 post not found
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        else {
            res.status(200).json(post);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

/**
 * Get comments by post id
 */
router.get('/:id/comments', (req, res) => {
    const { id: postId } = req.params;

    DB.findPostComments(postId).then(comments => {
        if(!comments.length) {
            res.status(404).json({ message: "Comments with the specified post ID do not exist." });
        }
        else {
            res.status(200).json(comments);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "The comments information could not be retrieved." });
    });
});

module.exports = router;