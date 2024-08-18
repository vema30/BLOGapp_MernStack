import React, { useState } from 'react';

// Notification Component
function Notification({ message, type, onClose }) {
    const notificationStyle = {
        position: 'fixed',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '4px',
        backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
        color: 'white',
        zIndex: 1000,
    };

    return (
        <div style={notificationStyle}>
            {message}
            <button onClick={onClose} style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                ×
            </button>
        </div>
    );
}

// Card Component
function Card({ onPublish }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState(null);

    const handlePublishClick = async () => {
        if (title && description) {
            try {
                const response = await fetch('http://localhost:4000/api/blogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, description }),
                });
    
                // Check if response status is OK
                if (response.ok) {
                    const newBlog = await response.json();
                    onPublish(newBlog.title, newBlog.description);
                    setTitle(''); // Clear the input fields after publishing
                    setDescription('');
                    setNotification({ message: 'Blog published successfully!', type: 'success' });
                } else {
                    // If response status is not OK, handle the error
                    const errorData = await response.json();
                    setNotification({ message: `Failed to publish blog: ${errorData.message || 'Unknown error'}`, type: 'error' });
                }
            } catch (error) {
                setNotification({ message: `Error publishing blog: ${error.message || 'Unknown error'}`, type: 'error' });
            }
        } else {
            setNotification({ message: 'Title and description are required.', type: 'error' });
        }
    };
    

    const handleCloseNotification = () => {
        setNotification(null);
    };

    return (
        <div>
            {notification && (
                <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />
            )}
            <div style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '30px',
                maxWidth: '500px',
                margin: '20px auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9'
            }}>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    textAlign: 'center',
                    color: '#333'
                }}>
                    Fill the Form For Creating Your Blog
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <div>
                        <p style={{ marginBottom: '8px', color: '#555' }}>Blog Title</p>
                        <input 
                            placeholder="Your title here ..." 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '16px',
                                minHeight: '40px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <div>
                        <p style={{ marginBottom: '8px', color: '#555' }}>Blog Description</p>
                        <textarea
                            placeholder="Your description here ..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '16px',
                                minHeight: '150px',
                                resize: 'vertical',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>
                <button
                    onClick={handlePublishClick}
                    style={{
                        width: '100%',
                        padding: '12px 0',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}>
                    Publish
                </button>
            </div>
        </div>
    );
}

export default Card;
