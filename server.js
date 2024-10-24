const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Schema and Model
const postSchema = new mongoose.Schema({
    title: String,
    tags: String,
    category: String,
    postType: String,
    publishDate: Date,
    content: String,
});

const Post = mongoose.model('Post', postSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { title, tags, category, postType, publishDate, content } = req.body;

    const newPost = new Post({
        title,
        tags,
        category,
        postType,
        publishDate,
        content,
    });

    try {
        await newPost.save();
        res.status(201).send('Post created successfully');
    } catch (error) {
        res.status(400).send('Error creating post');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// Route to get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send('Error fetching posts');
    }
});