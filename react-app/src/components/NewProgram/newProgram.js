import React, { useEffect, useState } from 'react';

const NewProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgramName, setNewProgramName] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    // Fetch the existing programs
    // Dummy API call simulation
    const response = await fetch('http://localhost:8000/api/program-names/');
    const data = await response.json();
    setPrograms(data);
  };

  const handleAddProgram = async () => {
    // Add new program
    const response = await fetch('http://localhost:8000/api/add-program-names/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ProgramName: newProgramName }),
    });

    if (response.ok) {
      setNewProgramName(''); // Reset input field
      fetchPrograms(); // Re-fetch programs to update the list
    }
  };

  return (
    <div className="p-5 m-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Programs</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          placeholder="Enter Program Name"
          value={newProgramName}
          onChange={(e) => setNewProgramName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddProgram}
        >
          Add
        </button>
      </div>
      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {programs.map((program) => (
              <tr key={program.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {program.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {program.ProgramName}
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
