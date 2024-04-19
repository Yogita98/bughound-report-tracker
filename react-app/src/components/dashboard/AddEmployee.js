import React, { useEffect, useState } from 'react';

const NewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    Name: '',
    Username: '',
    Password: '',
    ConfirmPassword: '',
    ContactInfo: '',
    Role: ''
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Name: '',
    Username: '',
    ContactInfo: '',
    Role: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('http://localhost:8000/api/employees/');
    const data = await response.json();
    setEmployees(data);
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.Name || !newEmployee.Username || !newEmployee.Password || !newEmployee.ConfirmPassword || !newEmployee.ContactInfo || !newEmployee.Role) {
        alert('All fields are required');
        return;
    }
    if (newEmployee.Password !== newEmployee.ConfirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Constructing the registration data
    const registrationData = {
        name: newEmployee.Name,
        username: newEmployee.Username,
        password: newEmployee.Password,
        confirmPassword: newEmployee.ConfirmPassword,
        contactInfo: newEmployee.ContactInfo,
        role: newEmployee.Role
    };

    try {
        const response = await fetch('http://localhost:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        });

        if (response.ok) {
            setNewEmployee({ Name: '', Username: '', Password: '', ConfirmPassword: '', ContactInfo: '', Role: '' }); // Reset the form
            setShowAddForm(false); // Hide the form
            fetchEmployees(); // Refresh the list
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to add the employee');
        }
    } catch (error) {
        console.error('Add employee error:', error);
        alert('Failed to add the employee');
    }
};

  const handleEditClick = (employee) => {
    setEditEmployeeId(employee.id);
    setEditFormData({
      Name: employee.Name,
      Username: employee.Username,
      ContactInfo: employee.ContactInfo,
      Role: employee.Role
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:8000/api/employees/${editEmployeeId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editFormData)
    });
    if (response.ok) {
      setEditEmployeeId(null); // Exit edit mode
      fetchEmployees(); // Refresh the list
    } else {
      alert('Failed to save changes');
    }
  };

  const handleCancel = () => {
    setEditEmployeeId(null);
  };

  return (
    <div className="p-5 m-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Employees</h1>
      {showAddForm ? (
        <div className="mb-4">
          <input type="text" name="Name" placeholder="Enter Name" value={newEmployee.Name} onChange={(e) => setNewEmployee({...newEmployee, Name: e.target.value})} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
          <input type="text" name="Username" placeholder="Enter Username" value={newEmployee.Username} onChange={(e) => setNewEmployee({...newEmployee, Username: e.target.value})} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
          <input type="password" name="Password" placeholder="Enter Password" value={newEmployee.Password} onChange={(e) => setNewEmployee({...newEmployee, Password: e.target.value})} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
          <input type="password" name="ConfirmPassword" placeholder="Confirm Password" value={newEmployee.ConfirmPassword} onChange={(e) => setNewEmployee({...newEmployee, ConfirmPassword: e.target.value})} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
          <input type="text" name="ContactInfo" placeholder="Enter Contact Info" value={newEmployee.ContactInfo} onChange={(e) => setNewEmployee({...newEmployee, ContactInfo: e.target.value})} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
          <input type="text" name="Role" placeholder="Enter Role" value={newEmployee.Role} onChange={(e) => setNewEmployee({...newEmployee, Role: e.target.value})} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
          <button onClick={handleAddEmployee} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          <button onClick={() => setShowAddForm(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowAddForm(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add New Employee</button>
      )}
      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees.map((employee) =>
              editEmployeeId === employee.id ? (
                <tr key={employee.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="Name" value={editFormData.Name} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="Username" value={editFormData.Username} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="ContactInfo" value={editFormData.ContactInfo} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="Role" value={editFormData.Role} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={handleSave} className="text-green-600 hover:text-green-900">Save</button>
                    <button onClick={handleCancel} className="text-red-600 hover:text-red-900 ml-4">Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={employee.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.ContactInfo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditClick(employee)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEmployee;