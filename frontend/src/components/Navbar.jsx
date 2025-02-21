import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink to="/" className="text-xl font-bold">
                    Zidio Task Management
                </NavLink>
                <div>
                    <NavLink to="/register" className="mr-4">Register</NavLink>
                    <NavLink to="/dashboard" className="mr-4">Dashboard</NavLink>
                    <NavLink to="/login" className="mr-4">Logout</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;