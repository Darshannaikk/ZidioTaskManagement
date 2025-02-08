import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Zidio Task Management
                </Link>
                <div>
                    <Link to="/login" className="mr-4">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;