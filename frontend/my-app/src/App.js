import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Heading from './heading';
import Card from './Card';
import BlogList from './BlogList'; // Import the BlogList component
import './Navbar.css';
import './App.css'; // Import your App-specific CSS if needed

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Heading />
                <Routes>
                    <Route path="/create" element={<Card />} />
                    <Route path="/view" element={<BlogList />} />
                    <Route path="/" element={<Card />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
