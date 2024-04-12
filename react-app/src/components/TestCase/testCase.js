import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const TestCase = () => {
  // Initial state for the form data
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/dashboard');
  };
  const generateBugId = () => {
    const timestamp = Date.now();
    const randomComponent = Math.floor(Math.random() * 1000); // Generate a random number between 0-999
    return `${timestamp}-${randomComponent}`;
  };
  //API - generate employees names in the dropdown
  const [employees, setEmployees] = useState([]);
    useEffect(() => {
        async function fetchEmployees() {
            const response = await fetch('http://localhost:8000/api/employees-names/');
            const data = await response.json();
            setEmployees(data);
        }
        fetchEmployees();
    }, []);
  const [formData, setFormData] = useState({
    id:generateBugId(),
    program: "",
    functionalArea:"",
    reportType: "",
    severity: "",
    problemSummary: "",
    suggestedFix: "",
    reportedBy: "",
    reportedBydate:"",
    assignedTo: "",
    comments: "",
    status: "",
    priority: "",
    resolution: "",
    resolutionVersion: "",
    resolvedBy: "",
    resolvedBydate: "",
    testedBy: "",
    reproducible: false,
    treatedAsDeferred: false,
  });

  
  const severityOptions = [
    { name: "Minor", id: "1" },
    { name: "Serious", id: "2" },
    { name: "Fatal", id: "3" },
    { name: "Annoyance", id: "4" },
  ];
  const functionalAreaOptions = [
    { name: "Authentication", id: "1" },
    { name: "User Interface", id: "2" },
    { name: "Performance", id: "3" },
    { name: "Security", id: "4" },
    { name: "Architecture", id: "5" },
    { name: "Network", id: "6" },
  ];
  const resolutionVersionOptions = [
    { name: "v1", id: "1" },
    { name: "v2", id: "2" },
    { name: "v3", id: "3" },
    { name: "v4", id: "4" },
  ];

  const priorityOptions = [
    { name: "Fix immediately", id: "1" },
    { name: "Fix as soon as possible", id: "2" },
    { name: "Fix before next milestone", id: "3" },
    { name: "Fix before release", id: "4" },
    { name: "Fix if possible", id: "5" },
    { name: "Optional", id: "6" },
  ];
  const statusOptions = [
    { name: "Open", id: "1" },
    { name: "Closed", id: "2" },
    { name: "Resolved", id: "3" },
  ];
  const reportTypeOptions = [
    { name: "Coding Error", id: "1" },
    { name: "Design Error", id: "2" },
    { name: "Suggestions", id: "3" },
    { name: "Documentation", id: "4" },
    { name: "Hardware", id: "5" },
    { name: "Query", id: "6" },
  ];
  const resolutionOptions = [
    { name: "Pending", id: "1" },
    { name: "Fixed", id: "2" },
    { name: "Irreproducible", id: "3" },
    { name: "Deferred", id: "4" },
    { name: "As Designed", id: "5" },
    { name: "Can't be fixed", id: "6" },
    { name: "Withdrawn by Reporter", id: "7" },
    { name: "Need More Information", id: "8" },
    { name: "Disagree with suggestions", id: "9" },
  ];
  // Handle changes in form inputs
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit the form data
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Submission successful", data);
        // Optional: Reset form or redirect the user
      } else {
        console.error("Submission failed");
        // Handle response errors here
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Test Case</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bug ID:
        </label>
        <input
          type="text"
          name="bugId"
          value={formData.id}
          readOnly 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
        </div>
        {/* Program selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program:
          </label>
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Program</option>
            {/* Dynamic options for programs */}
          </select>
        </div>
        {/* Functional Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Functional Area:
          </label>
          <select
            name="functionalArea"
            value={formData.functionalArea}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Functional Area</option>
            {functionalAreaOptions.map((functionalAreaOptions) => (
              <option key={functionalAreaOptions.id} value={functionalAreaOptions.name}>
                {functionalAreaOptions.name}
              </option>
            ))}
          </select>
        </div>

        {/* Report Type selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report Type:
          </label>
          <select
            name="reportType"
            value={formData.reportType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Report Type</option>
            {reportTypeOptions.map((reportTypeOptions) => (
              <option key={reportTypeOptions.id} value={reportTypeOptions.name}>
                {reportTypeOptions.name}
              </option>
            ))}
          </select>
        </div>

        {/* Severity selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity:
          </label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Severity</option>
            {severityOptions.map((severityOptions) => (
              <option key={severityOptions.id} value={severityOptions.name}>
                {severityOptions.name}
              </option>
            ))}
          </select>
        </div>

        {/* Problem Summary input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Problem Summary and How to Reproduce it?
          </label>
          <textarea
            name="problemSummary"
            value={formData.problemSummary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Suggested Fix input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Suggested Fix:
          </label>
          <textarea
            name="suggestedFix"
            value={formData.suggestedFix}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Reported By selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reported By:
          </label>
          <select
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Reported By</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.Name}>{employee.Name}</option>
            ))}
  
          </select>
        </div>
        {/* Date input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            name="reportedBydate"
            type="date"
            value={formData.reportedBydate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Assigned To selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assigned To:
          </label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Assigned To</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.Name}>{employee.Name}</option>
            ))}
          </select>
        </div>

        {/* Status selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Status</option>
            {statusOptions.map((statusOptions) => (
              <option key={statusOptions.id} value={statusOptions.name}>
                {statusOptions.name}
              </option>
            ))}
          </select>
        </div>

        {/* Priority selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority:
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Priority</option>
            {priorityOptions.map((priorityOptions) => (
              <option key={priorityOptions.id} value={priorityOptions.name}>
                {priorityOptions.name}
              </option>
            ))}
          </select>
        </div>

        {/* Resolution selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolution:
          </label>
          <select
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Resolution</option>
            {resolutionOptions.map((resolutionOptions) => (
              <option key={resolutionOptions.id} value={resolutionOptions.name}>
                {resolutionOptions.name}
              </option>
            ))}
          </select>
        </div>

        {/* Resolution Version selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolution Version:
          </label>
          <select
            name="resolutionVersion"
            value={formData.resolutionVersion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Resolution Version</option>
            {resolutionVersionOptions.map((resolutionVersionOptions) => (
              <option key={resolutionVersionOptions.id} value={resolutionVersionOptions.name}>
                {resolutionVersionOptions.name}
              </option>
            ))}
          </select>
        </div>

        {/* Resolved By selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolved By:
          </label>
          <select
            name="resolvedBy"
            value={formData.resolvedBy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Resolved By</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.Name}>{employee.Name}</option>
            ))}
          </select>
        </div>

        {/* Date input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            name="resolvedBydate"
            type="date"
            value={formData.resolvedBydate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Tested By selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tested By:
          </label>
          <select
            name="testedBy"
            value={formData.testedBy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Tested By</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.Name}>{employee.Name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comments:
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Reproducible checkbox */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reproducible:
          </label>
          <input
            name="reproducible"
            type="checkbox"
            checked={formData.reproducible}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Treated as Deferred checkbox */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Treated as Deferred:
          </label>
          <input
            name="treatedAsDeferred"
            type="checkbox"
            checked={formData.treatedAsDeferred}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Form submission and reset buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setFormData({})} // Reset form state
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestCase;