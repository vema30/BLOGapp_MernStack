import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
    return (
        <div className="nav">
            <div className="blogapp">Blog App</div>
            <div className="nav2">
                <Link to="/create" className="nav-item">Create Blog</Link>
                <Link to="/view" className="nav-item">View All Blogs</Link>
            </div>
        </div>
    );
}

export default Navbar;
