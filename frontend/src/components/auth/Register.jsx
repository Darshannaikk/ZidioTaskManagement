import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

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
        <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            {fieldErrors.general && <Alert severity="error" style={{ width: '100%', marginBottom: '10px' }}>{fieldErrors.general}</Alert>}
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
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
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                Already have an account? <a href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Login</a>
            </Typography>
        </Container>
    );
};

export default Register;
