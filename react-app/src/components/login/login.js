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
            // email: email,
            password: password,
            username: username
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
            const data = await response.json();
            console.log('Response data: ', data);
            if (response.ok) {
                localStorage.setItem('access-token', data.access)
                localStorage.setItem('refresh-token', data.refresh)
                navigate('/dashboard', { state: { user: data.user } })
                // If login is successful, navigate to the dashboard page
                // if(data.user.is_superuser){
                //     navigate('/employee-dashboard', { state: { user: data.user } })
                // } else 
                //     navigate('/dashboard', { state: { user: data.user } })
                // if (data.Role === 'Full Access') {
                //     navigate('/adminDashboard'); // Navigate to the Admin Dashboard if full access
                // } else {
                //     navigate('/dashboard'); // Navigate to the standard dashboard if limited access
                // }
            } else {
                // If the API returns an error (e.g., wrong email/password), set an error message
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">
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