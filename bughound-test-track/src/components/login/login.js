import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct the login data
        const loginData = {
            Username: username,
            Password: password,
        };

        // Send a POST request to the login API
        try {
            const response = await fetch('http://localhost:8000/login/', { // Update the URL to your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                // If login is successful, navigate to the dashboard page
                navigate('/dashboard');
            } else {
                // If the API returns an error (e.g., wrong username/password), set an error message
                const data = await response.json();
                setError(data.error || 'Invalid username or password');
            }
        } catch (error) {
            // Handle network errors
            console.error('Login failed:', error);
            setError('Failed to login. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <Header
                heading="Login to your account"
                paragraph="New Employee? "
                linkName="Register"
                linkUrl="/register"
            />
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={handlePasswordChange} />
                </div>
                {error && <div className="text-red-500 text-xs italic">{error}</div>}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
