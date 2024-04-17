import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestCase = () => {
  // Initial state for the form data
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/dashboard");
  };
  const generateBugId = () => {
    const now = new Date();
    const day = now.getDate(); // Day of the month (1-31)
    const month = now.getMonth() + 1; // Month (1-12, +1 because getMonth() returns 0-11)
    const dayStr = day.toString().padStart(2, "0");
    const monthStr = month.toString().padStart(2, "0");
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return parseInt(monthStr+dayStr+randomPart);
  };
  //API - generate employees names in the dropdown
  const [employees, setEmployees] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const[selectedProgramId, setSelectedProgramId] = useState('');
  
  useEffect(() => {
    // Initially fetch all programs, assuming you have an endpoint for this
    fetch('http://localhost:8000/api/program-names/')
        .then(response => response.json())
        .then(data => setPrograms(data));
}, []);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch(
        "http://localhost:8000/api/employees-names/"
      );
      const data = await response.json();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);
  const [formData, setFormData] = useState({
     id: generateBugId(),
     Program: '',
  });
  
//Handle Program Change
const handleProgramChange =async (event) => {
  const programId = event.target.value;
  console.log(programId);
  setFormData(prevFormData => ({
    ...prevFormData,
    Program: programId,
    FunctionalArea: '' // Reset functional area when program changes
}));

  // Fetch the functional areas for the selected program
  if (programId) {
    fetch(`http://localhost:8000/api/program-functional-area-names/${programId}/`)
        .then(response => response.json())
        .then(data => setFunctionalAreas(data))
        .catch(error => console.error('Error fetching functional areas:', error));
} else {
    setFunctionalAreas([]);
}
};
const handleFunctionalAreaChange = (event) => {
  const functionalAreaId = event.target.value;
  setFormData(prevFormData => ({
      ...prevFormData,
      FunctionalArea: functionalAreaId
  }));
};
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
  //Program options
  const programOptions = [
    { name: "Program 1", id: "1" },
    { name: "Program 2", id: "2" },
    { name: "Program 3", id: "3" },
    { name: "Program 4", id: "4" },
    { name: "Program 5", id: "5" },
  ];

  // Handle changes in form inputs
  const handleChange = (event) => {
    console.log(event.target);
    const { name, value, type, checked, files } = event.target;
    console.log(name + " " + value + " " + type + " " + files);
    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Assumes single file upload
      }));
    } else if (name == "ReportTypeID") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Submit the form data
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value != null && value !== "") {
          acc[key] = value;
      }
      return acc;
    }, {});
    console.log(filteredData);
    try {
      const response = await fetch("http://localhost:8000/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Submission successful");
        navigate("/dashboard");
        // Optional: Reset form or redirect the user
      } else {
        console.error("Submission failed");
        alert("Unable to submit the report!")
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
            name="Program"
            value={formData.Program}
            onChange={handleProgramChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.ProgramName}
              </option>
            ))}
          </select>
        </div>
        {/* Functional Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Functional Area:
          </label>
          <select
            name="FunctionalArea"
            value={formData.FunctionalArea}
            onChange={handleFunctionalAreaChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Functional Area</option>
            {functionalAreas.map(area => (
              <option
                key={area.FunctionalArea}
                value={area.FunctionalArea}
              >
                {area.AreaName}
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
            name="ReportTypeID"
            value={formData.ReportTypeID}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Report Type</option>
            {reportTypeOptions.map((reportTypeOptions, index) => (
              <option key={index} value={reportTypeOptions.id}>
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
            name="Severity"
            value={formData.Severity}
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
            Problem Summary:
          </label>
          <textarea
            name="ProblemSummary"
            value={formData.ProblemSummary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
        {/* Problem Summary input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Problem Description and How to Reproduce it?
          </label>
          <textarea
            name="ProblemDescription"
            value={formData.ProblemDescription}
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
            name="SuggestedFix"
            value={formData.SuggestedFix}
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
            name="ReportedByEmployee"
            value={formData.ReportedByEmployee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Reported By</option>
            {employees.map((employee, index) => (
              <option key={index} value={employee.id}>
                {employee.Name}
              </option>
            ))}
          </select>
        </div>
        {/* Date input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            name="ReportedByDate"
            type="date"
            value={formData.ReportedByDate}
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
            name="AssignedToEmployee"
            value={formData.AssignedToEmployee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Assigned To</option>
            {employees.map((employee, index) => (
              <option key={index} value={employee.id}>
                {employee.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Status selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            name="Status"
            value={formData.Status}
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
            name="Priority"
            value={formData.Priority}
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
            name="Resolution"
            value={formData.Resolution}
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
            name="ResolutionVersion"
            value={formData.ResolutionVersion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Resolution Version</option>
            {resolutionVersionOptions.map((resolutionVersionOptions) => (
              <option
                key={resolutionVersionOptions.id}
                value={resolutionVersionOptions.name}
              >
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
            name="ResolvedByEmployee"
            value={formData.ResolvedByEmployee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Resolved By</option>
            {employees.map((employee, index) => (
              <option key={index} value={employee.id}>
                {employee.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Date input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            name="ResolvedByDate"
            type="date"
            value={formData.ResolvedByDate}
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
            name="TestedByEmployee"
            value={formData.TestedByEmployee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Tested By</option>
            {employees.map((employee, index) => (
              <option key={index} value={employee.id}>
                {employee.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            name="TestedByDate"
            type="date"
            value={formData.TestedByDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comments:
          </label>
          <textarea
            name="Comments"
            value={formData.Comments}
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
            name="Reproducible"
            type="checkbox"
            checked={formData.Reproducible}
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
            name="TreatedAsDeferred"
            type="checkbox"
            checked={formData.TreatedAsDeferred}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachment:
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-transparent"
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