import React from 'react';
import { Button } from '@mui/material';

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">

            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6  text-wrap text-center">Zidio Task Management</span>

            <p className="text-center text-gray-800 text-lg sm:text-xl max-w-2xl mb-6">Boost your productivity and manage tasks efficiently with our intuitive and powerful task management system.</p>

            <div className="flex space-x-4 gap-2 mb-8" >
                <Button variant="contained" size="large" href='/register'>Register</Button>
                <Button variant="contained" size="large" href='/login'>Login</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-white text-gray-800 rounded shadow-md shadow-black transition transform hover:scale-105 ">
                    <h2 className="text-xl font-bold">Task Scheduling</h2>
                    <p className="text-gray-600">Plan and organize tasks effectively with deadlines and priorities.</p>
                </div>
                <div className="p-4 bg-white text-gray-800 rounded shadow-md shadow-black transition transform hover:scale-105">
                    <h2 className="text-xl font-bold">Collaboration</h2>
                    <p className="text-gray-600">Work seamlessly with teams using shared tasks and updates.</p>
                </div>
                <div className="p-4 bg-white text-gray-800 rounded shadow-md shadow-black transition transform hover:scale-105">
                    <h2 className="text-xl font-bold">Progress Tracking</h2>
                    <p className="text-gray-600">Monitor and analyze your progress with insightful reports.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
