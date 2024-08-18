const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT =  4000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myBlogDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Blog schema and model
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).send('Error fetching blogs');
    }
});
app.post('/api/blogs', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newBlog = new Blog({ title, description });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Error saving blog', error });
    }
});
// index.js or server.js

// Route to update a blog by ID
app.put('/api/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedBlog) return res.status(404).send('Blog not found');
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).send('Error updating blog');
    }
});

// Route to delete a blog by ID
// Route to delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) return res.status(404).send('Blog not found');
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting blog');
    }
});
// Route to update a blog by ID
app.put('/api/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // Return the updated document
        );
        if (!updatedBlog) return res.status(404).send('Blog not found');
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).send('Error updating blog');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
