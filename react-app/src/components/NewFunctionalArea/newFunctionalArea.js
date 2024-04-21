import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NewFunctionalArea = () => {
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [newFunctionalAreaName, setNewFunctionalAreaName] = useState('');
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [uniquePrograms, setUniquePrograms] = useState([]);
  const [editFormData, setEditFormData] = useState({
    AreaName: '',
    ProgramId: '',
  });
  const token = localStorage.getItem('access-token')
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  const location = useLocation()
  const user = location.state.user
  console.log(user.is_superuser==1)

  useEffect(() => {
    fetchFunctionalAreaNames();
    fetchPrograms();
  }, []);

  const fetchFunctionalAreaNames = async () => {
    const response = await fetch('http://localhost:8000/api/functional-area-names/', { headers });
    const data = await response.json();
    setFunctionalAreas(data);
  };

  const fetchPrograms = async () => {
    const response = await fetch('http://localhost:8000/api/program-names/', { headers });
    const data = await response.json();
    setPrograms(data);

    // Create a Set to track unique programs
    const programSet = new Set();
    const uniquePrograms = data.filter(program => {
      const isDuplicate = programSet.has(program.ProgramName);
      programSet.add(program.ProgramName);
      return !isDuplicate;
    });

    setUniquePrograms(uniquePrograms);

    if (uniquePrograms.length > 0) {
      setSelectedProgramId(uniquePrograms[0].id); // Default to the first unique program
    }
  };

  const handleAddFunctionalArea = async () => {

    if (!selectedProgramId) {
      alert("Please select a program.");
      return;
    }
    if(user.is_superuser==1){
      alert("You do not have permission to perform this operation!!")
      return
    }
    const response = await fetch('http://localhost:8000/api/add-functional-area-names/', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        AreaName: newFunctionalAreaName,
        Program: selectedProgramId, // Send the selected program ID
      }),
    });

    if (response.ok) {
      setNewFunctionalAreaName(''); // Reset input field
      fetchFunctionalAreaNames(); // Re-fetch functional areas to update the list
    } else {
      const errorData = await response.json();
      alert('Failed to add functional area: ' + errorData.error);
    }
  };
  

  const startEdit = (area) => {
    setEditingId(area.id);
    setEditFormData({
      AreaName: area.AreaName,
      ProgramId: area.Program,
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const saveEdit = async (id) => {
    const response = await fetch(`http://localhost:8000/api/update-functional-area-names/${id}/`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        AreaName: editFormData.AreaName,
        Program: editFormData.ProgramId,
      }),
    });

    if (response.ok) {
      setEditingId(null);
      fetchFunctionalAreaNames();
    } else {
      alert('Failed to update functional area');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  // const downloadAreaXML = (area) => {
  //   // Get the current timestamp
  //   const currentTime = new Date().toISOString();
  
  //   // Construct the XML content including the timestamp
  //   const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  //     <FunctionalArea>
  //       <AreaID>${area.id}</AreaID>
  //       <AreaName>${area.AreaName}</AreaName>
  //       <Program>${area.ProgramName}</Program>
  //       <Timestamp>${currentTime}</Timestamp>
  //     </FunctionalArea>
  //   `.trim(); // Trim any leading or trailing whitespace
  
  //   // Create a Blob with the XML content
  //   const blob = new Blob([xmlContent], { type: "application/xml" });
  
  //   // Create a URL for the Blob
  //   const url = URL.createObjectURL(blob);
  
  //   // Create a link element and trigger the download
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = 'functional_area_details.xml';
  //   link.click();
  
  //   // Revoke the URL to release resources
  //   URL.revokeObjectURL(url);
  // };

  const downloadAllAreasXML = () => {
    // Get the current timestamp
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles'
    });
  
    // Create an array to store XML content for each area
    const xmlContents = functionalAreas.map(area => {
      return `<?xml version="1.0" encoding="UTF-8"?>
      <Timestamp>${currentTime}</Timestamp>
        <FunctionalArea>
          <AreaID>${area.id}</AreaID>
          <AreaName>${area.AreaName}</AreaName>
          <Program>${programs.find(p => p.id === area.Program)?.ProgramName || 'N/A'}</Program>
        </FunctionalArea>
      `.trim();
    });
  
    // Combine XML contents into a single string
    const combinedXmlContent = xmlContents.join('\n');
  
    // Create a Blob with the combined XML content
    const blob = new Blob([combinedXmlContent], { type: "application/xml" });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a link element and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = 'functional_area_details.xml';
    link.click();
  
    // Revoke the URL to release resources
    URL.revokeObjectURL(url);
  };
  
  // Iterate over each row in the table and call downloadAllAreasXML function
  const downloadAllAreas = () => {
    functionalAreas.forEach(area => {
      downloadAllAreasXML(area);
    });
  };
  
  
  
    

  return (
    <div className="p-5 m-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Functional Areas</h1>
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div>
          <input
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          placeholder="Enter Functional Area Name"
          value={newFunctionalAreaName}
          onChange={(e) => setNewFunctionalAreaName(e.target.value)}
        />
        <select
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          value={selectedProgramId}
          onChange={(e) => setSelectedProgramId(e.target.value)}
        >
          {uniquePrograms.map(program => (
            <option key={program.id} value={program.id}>
              {program.ProgramName}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddFunctionalArea}
        >
          Add
        </button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={downloadAllAreasXML}
        >
          Download
        </button>
      </div>
      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Functional Area ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Functional Area Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {functionalAreas.map((area) => (
              <tr key={area.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {area.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId === area.id ? (
                    <input
                      type="text"
                      name="AreaName"
                      value={editFormData.AreaName}
                      onChange={handleEditFormChange}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    area.AreaName
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId === area.id ? (
                    <select
                      name="ProgramId"
                      value={editFormData.ProgramId}
                      onChange={handleEditFormChange}
                      className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {programs.map(program => (
                        <option key={program.id} value={program.id}>
                          {program.ProgramName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    programs.find(p => p.id === area.Program)?.ProgramName || 'N/A'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingId === area.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(area.id)}
                        className="text-indigo-600 hover:text-indigo-900 px-4"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-600 hover:text-red-900 px-4"
                      >
                        Cancel
                      </button>
                      
                    </>
                  ) : (
                    <>
                    <button
                      onClick={() => startEdit(area)}
                      className="text-indigo-600 hover:text-indigo-900 px-4"
                    >
                      Edit
                    </button>
                    
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewFunctionalArea;