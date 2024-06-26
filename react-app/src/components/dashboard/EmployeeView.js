import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

const EmployeeView = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: ''
  });

  const token = localStorage.getItem('access-token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('http://localhost:8000/api/employees-names/', { headers });
    const data = await response.json();
    setEmployees(data);
  };

  const handleEditClick = (employee) => {
    setEditEmployeeId(employee.id);
    setEditFormData({
      name: employee.name,
      username: employee.username,
      email: employee.email,
      role: employee.role
    });
  };

  const handleEditFormChange = (event) => {
    console.log(event)
    const { name, value } = event.target;
    console.log(name,value)
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:8000/api/employees/${editEmployeeId}/`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(editFormData)
    });
    if (response.ok) {
      setEditEmployeeId(null);
      fetchEmployees();
    } else {
      alert('Failed to save changes');
    }
  };

  const handleCancel = () => {
    setEditEmployeeId(null);
  };

  const handleDownload = () => {
    const timestamp = new Date().toISOString();
    let fileContent = `Export Timestamp: ${timestamp}\n\n`;
    fileContent += "ID, Name, Username, Email, Role\n";

    employees.forEach(employee => {
      fileContent += `${employee.id}, ${employee.name}, ${employee.username}, ${employee.email}, ${employee.role}\n`;
    });

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `Employees_${timestamp}.txt`);
  };

  return (
    <div className="p-5 m-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Employees</h1>
      <button onClick={handleDownload} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Export Employees
      </button>
      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info (Email)</th>
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
                    <input type="text" name="name" value={editFormData.name} onChange={(event) => handleEditFormChange(event)} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="username" value={editFormData.username} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="email" value={editFormData.email} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="role" value={editFormData.role} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={handleSave} className="text-green-600 hover:text-green-900">Save</button>
                    <button onClick={handleCancel} className="text-red-600 hover:text-red-900 ml-4">Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={employee.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
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

export default EmployeeView;