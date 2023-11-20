const express = require("express");

const { Post } = require("../model/post");
const router = express.Router();
const jwt = require("jsonwebtoken");

//Post
router.post("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("Access denied");
  }
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
  });
  post = new Post({
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    createBy: req.body.createBy,
    createAt: new Date(),
  });
  post
    .save()
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//Get all
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const search = req.query.search || '';
  Post.find({
    $or: [
      { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on 'title' field
      { description: { $regex: search, $options: 'i' } }, // Case-insensitive search on 'content' field
    ],
  })
    .sort({ createAt: -1 })
    .then((post) => res.send(post))
    .catch((err) => {
      res.status(500).send(err);
    });
});
//Get by id

router.get("/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const post = await Post.findById(req.params.id);
  if (!post) res.status(404).send("Not found");
  else res.send(post);
});

router.put("/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("Access denied");
  }
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
  });
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
    },
    { new: true }
  );
  if (!updatePost) res.status(404).send("Not found");
  else {
    res.send(updatePost);
  }
});
//delete
router.post("/delete", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("Access denied");
  }
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
  });
  const id = req.body.id;
  const post = await Post.findByIdAndRemove(id);
  if (!post) res.status(404).send("Not found");
  else {
    res.send(post);
  }
});

//Inactive

router.put("/inactive/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("Access denied");
  }
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
  });
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      isActive: req.body.isActive
    },
    { new: true }
  );
  if (!updatePost) res.status(404).send("Not found");
  else {
    res.send(updatePost);
  }
});
module.exports = router;
