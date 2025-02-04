import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

interface FieldErrors {
    username?: string;
    email?: string;
    password?: string;
    general?: string;
}

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFieldErrors({});

        const errors: FieldErrors = {};
        if (!username.trim()) errors.username = 'Username is required';

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            errors.email = 'Invalid email format';
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (!validatePassword(password)) {
            errors.password = 'Password must be at least 6 characters long, contain one uppercase letter, one numeric value, and one special character';
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        try {
            await axios.post('/api/users/register', { username, email, password });
            navigate('/login');
        } catch (err: any) {
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    fullWidth
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
