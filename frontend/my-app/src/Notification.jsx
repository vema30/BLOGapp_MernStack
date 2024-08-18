import React from 'react';

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

export default Notification;
