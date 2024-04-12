import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hardcoded test case details for demonstration
  const [testCase, setTestCase] = useState({
    program: "Sample Program",
    reportType: "Bug Report",
    severity: "High",
    problemSummary: "Sample problem summary...",
    suggestedFix: "Sample suggested fix...",
    reportedBy: "John Doe",
    assignedTo: "Jane Doe",
    comments: "Initial review completed.",
    status: "Open",
    priority: "High",
    resolution: "Pending",
    resolutionVersion: "1.0.1",
    resolvedBy: "Joh",
    date: "2023-01-01",
    testedBy: "Tester Name",
    reproducible: true,
    treatedAsDeferred: false,
  });
  const users = [
    { name: "Sharvika", id: "1" },
    { name: "Kasturi", id: "2" },
    { name: "Yogita", id: "3" }
  ];
  const statusOptions = [
    { name: "Open", id: "5" },
    { name: "Closed", id: "6" },
    { name: "In Progress", id: "7" }
  ];
  const priorityOptions = [
    { name: "Critical", id: "5" },
    { name: "High", id: "6" },
    { name: "Moderate", id: "7" },
    { name: "Low", id: "8" },

  ];

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestCase((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Simulated submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Test Case:", testCase);
    alert("Test case updated successfully! (simulated)");
    // Navigate back to the dashboard or relevant page
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Test Case ID: {id}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program:
          </label>
          <input
            type="text"
            name="program"
            value={testCase.program}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report Type:
          </label>
          <input
            type="text"
            name="program"
            value={testCase.reportType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity:
          </label>
          <input
            type="text"
            name="program"
            value={testCase.severity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comments:
          </label>
          <input
            type="text"
            name="program"
            value={testCase.comments}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reported By:
          </label>
          <select
            name="reportedBy"
            value={testCase.reportedBy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.reportedBy}</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assigned To:
          </label>
          <select
            name="AssignedTo"
            value={testCase.assignedTo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.assignedTo}</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolved By:
          </label>
          <select
            name="AssignedTo"
            value={testCase.resolvedBy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.resolvedBy}</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolution Version:
          </label>
          <input
            type="text"
            name="program"
            value={testCase.resolutionVersion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="text"
            name="program"
            value={testCase.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status :
          </label>
          <select
            name="status"
            value={testCase.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.status}</option>
            {statusOptions.map(statusOptions => (
              <option key={statusOptions.id} value={statusOptions.name}>{statusOptions.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority :
          </label>
          <select
            name="status"
            value={testCase.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.status}</option>
            {priorityOptions.map(priorityOptions => (
              <option key={priorityOptions.id} value={priorityOptions.name}>{priorityOptions.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program :
          </label>
          <input
            type="text"
            name="program"
            value={testCase.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reproducible:
          </label>
          <input
            type="text"
            value={testCase.reproducible ? "Yes" : "No"}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTestForm;
