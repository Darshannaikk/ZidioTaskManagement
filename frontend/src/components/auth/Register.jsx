import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert, Paper } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFieldErrors({});

        const errors = {};
        if (!formData.username.trim()) errors.username = 'Username is required';

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        } else if (!validatePassword(formData.password)) {
            errors.password = 'Password must contain one uppercase letter, one numeric value, and one special character';
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        try {
            await axios.post('/api/users/register', formData);
            navigate('/login');
        } catch (err) {
            if (err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors);
            } else {
                setFieldErrors({ general: err.response?.data?.message || 'Registration failed' });
            }
        }
    };

    return (
        <div className='min-h-screen flex px-4 bg-gradient-to-r from-blue-500 to-purple-600'>
            <Container maxWidth="false" className="max-w-[350px] h-fit mt-30 flex flex-col items-center bg-white p-6 rounded-lg shadow-2xl shadow- shadow-black">
                <Typography variant="h4" component="h1" gutterBottom className="text-gray-800 font-bold">
                    Register
                </Typography>

                {/* General Error Message */}
                {fieldErrors.general && (
                    <Alert severity="error" className="w-full mb-2">{fieldErrors.general}</Alert>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        error={!!fieldErrors.username}
                        helperText={fieldErrors.username}
                        className="bg-gray-50 rounded-md"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        className="bg-gray-50 rounded-md"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        error={!!fieldErrors.password}
                        helperText={fieldErrors.password}
                        className="bg-gray-50 rounded-md"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth className="py-2 rounded-md">
                        Register
                    </Button>
                </form>
                <Typography variant="body2" align="center" className="text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </Typography>
            </Container>
        </div>
    );
};

export default Register;
