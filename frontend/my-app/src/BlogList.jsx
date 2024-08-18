import React, { useState, useEffect } from 'react';
import './BlogList.css'; // Import the CSS file

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch('http://localhost:4000/api/blogs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                setError(`Error: ${error.message}`);
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    const handleEditClick = (blog) => {
        setEditingId(blog._id);
        setEditTitle(blog.title);
        setEditDescription(blog.description);
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: editTitle, description: editDescription }),
            });

            if (response.ok) {
                const updatedBlog = await response.json();
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog._id === id ? updatedBlog : blog
                    )
                );
                setEditingId(null);
            } else {
                setError('Failed to update blog');
            }
        } catch (error) {
            setError('Error updating blog');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
            } else {
                setError('Failed to delete blog');
            }
        } catch (error) {
            setError('Error deleting blog');
        }
    };
     
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="blog-list">
            <h2>All Blogs</h2>
            {blogs.length > 0 ? (
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog._id} className="blog-item">
                            {editingId === blog._id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder="Edit title"
                                    />
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        placeholder="Edit description"
                                    />
                                    <button onClick={() => handleUpdate(blog._id)}>Update</button>
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.description}</p>
                                    <button onClick={() => handleEditClick(blog)}>Edit</button>
                                    <button onClick={() => handleDelete(blog._id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blogs available</p>
            )}
        </div>
    );
}

export default BlogList;
