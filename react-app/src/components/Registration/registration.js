import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';

const Register = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeId, setEmployeeId] = useState(''); // This is not used in the POST. Ensure your backend doesn't require it or remove it.
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add validation for password and confirmPassword here
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        setError(''); // Clear previous errors

        const roleMappings = {
            "Developer": 1,
            "Tester": 2,
            "Project Manager": 3,
        };
    
        // Map the role name to its numeric value
        const roleNumericValue = roleMappings[role] || null;

        const registrationData = {
            name: employeeName,
            username: username,
            password: password,
            // contact_info: email,
            email: email,
            role: role, // Make sure this matches what your backend expects
        };


        console.log(JSON.stringify(registrationData))

        try {
            const response = await fetch('http://localhost:8000/register/', { // Adjust your API endpoint accordingly
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                const setToken = await fetch('http://localhost:8000/login/', { // Update the URL to your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            })
                const tokenData = await setToken.json();
                // console.log(response)
                localStorage.setItem('access-token', tokenData.access)
                localStorage.setItem('refresh-token', tokenData.refresh)
                navigate('/dashboard'); // Navigate to dashboard or login page upon successful registration
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed, please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed, please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <Header
                heading="Register a New Employee"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"
            />
            <h2 className="text-2xl font-semibold mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeName">
                        Name of the Employee:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeeName" type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
                        Employee ID:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeeId" type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Contact Info (Email ID):
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Employee Role:
                    </label>
                    <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select a Role</option>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                        <option value="Project Manager">Project Manager</option>
                        {/* Add more roles as needed */}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {error && <div className="text-red-500 text-xs italic">{error}</div>}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
