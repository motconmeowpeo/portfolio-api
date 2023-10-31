const express = require('express')

const { Post } = require('../model/post')
const router = express.Router()

//Post
router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    post = new Post({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        createBy: req.body.createBy,
        createAt: new Date(),
    })
    post.save().then((post) => {
        res.send(post)
    }).catch((err) => {
        res.status(500).send(err)
    })
})
//Get all
router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    Post.find().sort({ createAt: -1 }).then((post) => res.send(post)).catch((err) => {
        res.status(500).send(err)
    })
})
//Get by id

router.get("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const post = await Post.findById(req.params.id)
    if (!post)
        res.status(404).send('Not found')
    else
        res.send(post)

})
router.put("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const updatePost = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,

    }, { new: true })
    if (!updatePost)
        res.status(404).send("Not found")
    else {

        res.send(updatePost)
    }

})
//delete
router.post("/delete", async (req, res) => {
    const id = req.body.id;
    res.setHeader('Access-Control-Allow-Origin', '*');
    const post = await Post.findByIdAndRemove(id)
    if (!post)
        res.status(404).send("Not found")
    else {
        res.send(post)

    }

})
module.exports = router