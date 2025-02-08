// import React from "react";


// const Login = () => {


//   return (
//     <>
//       <section className="min-h-screen flex items-center justify-center
//      font-mono bg-gradient-to-r from-cyan-500 from-10% via-indigo-500 via-50%
//       to-sky-500 to -100%">

//         <div className="flex shadow-xl">
//           <div className="flex flex-col items-center justify-center text-center p-20 gap-8
//           bg-white rounded-2xl">

//             <h1 className="text-5xl font-bold">Welcome !!</h1>
//             <div className="flex flex-col text-xl text-left gap-1 ">

//               <span>Username</span>
//               <input type="text" className="rounded-md p-1 border-2 outline-none
//               focus:border-cyan-400 focus:bg-slate-50"></input>
//             </div>

//             <div className="flex flex-col text-xl text-left gap-1">
//               <span> Passsword</span>
//               <input type="password" className="rounded-md p-1 border-2 outline-none
//               focus:border-cyan-400 focus:bg-slate-50"/> 

//               <div className="flex gap-1 items-center">
//                 <input type="checkbox"/>
//              <span className="text-base">Rememeber Password </span>
//               </div>

//             </div>
//             <button className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500 
//             hover: from-pink-500 hover:to-yellow-500 text-white ">Login </button>

//             <p className="font-semibold">Don't have an account? 
//               <a href="Register.jsx" className="text-blue-400 hover:underline" >Register</a> </p>
//           </div>
//         </div>
//       </section>

//     </>
//   )

// }

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
        const response = await axios.post('/api/users/login', { email, password });
        localStorage.setItem('token', response.data.token); // Store token
        // TODO: Dispatch action to update auth state (Redux or Context API) - to be implemented later
        navigate('/dashboard'); // Redirect to dashboard after login - create dashboard later
    } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
    }
};

return (
    <Container maxWidth="xs">
        <Typography variant="h4" component="h1" gutterBottom>
            Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <a href="/register">Register</a>
        </Typography>
    </Container>
);
};

export default Login;