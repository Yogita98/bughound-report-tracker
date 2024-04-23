import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NewProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProgram, setNewProgram] = useState({
    ProgramName: '',
  });
  const [editProgramId, setEditProgramId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    ProgramName: '',
  });
  const token = localStorage.getItem('access-token')
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  const location = useLocation()

  const user = location.state.user
  console.log(user)

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const response = await fetch('http://localhost:8000/api/program-names/', { headers });
    const data = await response.json();
    setPrograms(data);
  };

  const handleAddProgram = async () => {
    
    if (!newProgram.ProgramName) {
      alert('All fields are required');
      return;
    }
    const response = await fetch('http://localhost:8000/api/add-program-names/', {
      method: 'POST',
      headers,
      body: JSON.stringify(newProgram)
    });
    if (response.ok) {
      setNewProgram({ ProgramName: ''}); // Reset the form
      setShowAddForm(false); // Hide the form
      fetchPrograms(); // Refresh the list
    } else {
      alert('Failed to add the program');
    }
  };

  const handleEditClick = (program) => {
    setEditProgramId(program.id);
    setEditFormData({
      ProgramName: program.ProgramName,
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
    const response = await fetch(`http://localhost:8000/api/update-program-names/${editProgramId}/`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(editFormData)
    });
    if (response.ok) {
      setEditProgramId(null); // Exit edit mode
      fetchPrograms(); // Refresh the list
    } else {
      alert('Failed to save changes');
    }
  };
  const handleShowAdd = () => {
    console.log(user.role)
    if(user.role == "Admin"){
      console.log(user.role)
      alert("Yo do not have permission to perform this operation")
      return;
    }
    else setShowAddForm(true)
  }

  const handleCancel = () => {
    setEditProgramId(null);
  };

  return (
    <div className="p-5 m-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Programs</h1>
      {showAddForm ? (
        <div className="mb-4">
          <input type="text" name="ProgramName" placeholder="Enter Program Name" value={newProgram.ProgramName} onChange={(e) => setNewProgram({...newProgram, ProgramName: e.target.value})} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
          <button onClick={handleAddProgram} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          <button onClick={() => setShowAddForm(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">Cancel</button>
        </div>
      ) : (
        <button onClick={handleShowAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add New Program</button>
      )}
      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {programs.map((program) =>
              editProgramId === program.id ? (
                <tr key={program.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="text" name="ProgramName" value={editFormData.ProgramName} onChange={handleEditFormChange} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={handleSave} className="text-green-600 hover:text-green-900">Save</button>
                    <button onClick={handleCancel} className="text-red-600 hover:text-red-900 ml-4">Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={program.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.ProgramName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditClick(program)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewProgram;