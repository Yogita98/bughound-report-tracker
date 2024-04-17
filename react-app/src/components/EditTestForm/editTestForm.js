import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditTestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const testCaseDetails = location.state.details;
  console.log(testCaseDetails);

  // Hardcoded test case details for demonstration
  const [testCase, setTestCase] = useState(testCaseDetails);
  const [employees, setEmployees] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const[selectedProgramId, setSelectedProgramId] = useState('');
  
    useEffect(() => {
        async function fetchEmployees() {
            const response = await fetch('http://localhost:8000/api/employees-names/');
            const data = await response.json();
            setEmployees(data);
        }
        fetchEmployees();
    }, []);
    useEffect(() => {
      // Initially fetch all programs, assuming you have an endpoint for this
      fetch('http://localhost:8000/api/program-names/')
          .then(response => response.json())
          .then(data => setPrograms(data));
  }, []);
    const reportTypeOptions = [
      { name: "Coding Error", id: "1" },
      { name: "Design Error", id: "2" },
      { name: "Suggestions", id: "3" },
      { name: "Documentation", id: "4" },
      { name: "Hardware", id: "5" },
      { name: "Query", id: "6" },
    ];
    const programOptions = [
      { name: "Program 1", id: "1" },
      { name: "Program 2", id: "2" },
      { name: "Program 3", id: "3" },
      { name: "Program 4", id: "4" },
      { name: "Program 5", id: "5" },
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
    
    const severityOptions = [
      { name: "Minor", id: "1" },
      { name: "Serious", id: "2" },
      { name: "Fatal", id: "3" },
      { name: "Annoyance", id: "4" },
    ];
  const users = [
    { name: "Sharvika", id: "1" },
    { name: "Kasturi", id: "2" },
    { name: "Yogita", id: "3" }
  ];
  const statusOptions = [
    { name: "Open", id: "1" },
    { name: "Closed", id: "2" },
    { name: "Resolved", id: "3" },
  ];
  const priorityOptions = [
    { name: "Fix immediately", id: "1" },
    { name: "Fix as soon as possible", id: "2" },
    { name: "Fix before next milestone", id: "3" },
    { name: "Fix before release", id: "4" },
    { name: "Fix if possible", id: "5" },
    { name: "Optional", id: "6" },
  ];

  // Handle form changes
  const handleChange = (event) => {
    // console.log(event.target);
    const { name, value, type, checked, files } = event.target;
    console.log(name + " " + value + " " + type + " " + files);
    if (type === "file") {
      setTestCase((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Assumes single file upload
      }));
    } else if (name == "ReportTypeID") {
      setTestCase((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value),
      }));
    } else {
      setTestCase((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    console.log(testCase);
  };
//Handle Program Change
const handleProgramChange =async (event) => {
  const programId = event.target.value;
  console.log(programId);
  setTestCase(prevTestCase => ({
    ...prevTestCase,
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
  setTestCase(prevTestCase => ({
      ...prevTestCase,
      FunctionalArea: functionalAreaId
  }));
};
  // Simulated submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const employeeMap = employees.reduce((acc, employee) => {
      acc[employee.Name] = employee.id; // Assuming the employee object has 'id' and 'name' properties
      return acc;
    }, {});

    function fetchEmployeeId(employee) {
      if (!employee) return null
      if(parseInt(employee) == employee)
        return parseInt(employee)
      else return parseInt(employeeMap[employee])
    }

    const modifiedTestCase = {
      id: testCase.id,
      ReportTypeID: testCase.ReportTypeID,
      Status: testCase.Status,
      TestedByEmployee: fetchEmployeeId(testCase.TestedByEmployee_id), // Use 'Unknown' if no matching employee found
      Comments: testCase.Comments,
      ProblemSummary: testCase.ProblemSummary,
      ProblemDescription: testCase.ProblemDescription,
      Reproducible: testCase.Reproducible,
      SuggestedFix: testCase.SuggestedFix,
      ReportedByDate: testCase.ReportedByDate,
      Priority: testCase.Priority,
      Resolution: testCase.Resolution,
      ResolutionVersion: testCase.ResolutionVersion,
      ResolvedByDate: testCase.ResolvedByDate,
      ResolvedByEmployee: fetchEmployeeId(testCase.ResolvedByEmployee_id),
      TestedByDate: testCase.TestedByDate,
      AssignedToEmployee: fetchEmployeeId(testCase.AssignedToEmployee_id),
      Program: testCase.Program,
      FunctionalArea: testCase.FunctionalArea,
      ReportedByEmployee: fetchEmployeeId(testCase.ReportedByEmployee_id),
      Severity: testCase.Severity,
      TreatedAsDeferred: testCase.TreatedAsDeferred
    };
    console.log(modifiedTestCase);
    if (JSON.stringify(testCase) !== JSON.stringify(testCaseDetails)) {
      console.log("Updated Test Case:", testCase);
      const response = await fetch(`http://localhost:8000/bug-reports/update/${testCase.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedTestCase)
      });
      if (response.ok) {
        alert("Test case updated successfully!");
        navigate(-1); // Navigate back or to another page
      } else {
        alert("Failed to update the test case.");
      }
      // alert("Test case updated successfully! (simulated)");
    } else {
      if (!window.confirm('No changes detected in the bug report. Do you still want to edit it?')) {
        // Save it!
        navigate(-1);
      }
    }
  };

  const handleClose = () => {
    console.log("Cancel button clicked!");
    // Determine where to navigate based on the dashboard type from state
      const destination = location.state.dashboardType === 'admin' ? '/adminDashboard' : '/dashboard';
      navigate(destination);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Test Case ID: {id}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
                    <label className="block text-sm font-medium text-gray-700">Bug ID:</label>
                    <input type="text" value={testCase.id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program:
          </label>
          <select
            name="Program"
            value={testCase.Program}
            onChange={handleProgramChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.Program}</option>
            {programs.map(program => (
              <option key={program.id} value={program.id}>{program.ProgramName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report Type:
          </label>
          <select
            name="ReportTypeID"
            value={testCase.ReportTypeID}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.ReportTypeID}</option>
            {reportTypeOptions.map(reportTypeOptions => (
              <option key={reportTypeOptions.id} value={reportTypeOptions.name}>{reportTypeOptions.name}</option>
            ))}
          </select>
          
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Functional Area:
          </label>
          <select
            name="FunctionalArea"
            value={testCase.FunctionalArea}
            onChange={handleFunctionalAreaChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.FunctionalArea}</option>
            {functionalAreas.map(area => (
              <option key={area.FunctionalArea} value={area.FunctionalArea}>{area.AreaName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity:
          </label>
          <select
            name="Severity"
            value={testCase.Severity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.Severity}</option>
            {severityOptions.map(severityOptions => (
              <option key={severityOptions.id} value={severityOptions.name}>{severityOptions.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Problem Summary:
          </label>
          <textarea
            name="ProblemSummary"
            value={testCase.ProblemSummary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Problem Description and How to Reproduce it?
          </label>
          <textarea
            name="ProblemDescription"
            value={testCase.ProblemDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Suggested Fix:
          </label>
          <textarea
            name="SuggestedFix"
            value={testCase.SuggestedFix}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reported By:
          </label>
          <select
            name="ReportedByEmployee_id"
            value={testCase.ReportedByEmployee_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.ReportedByEmployee_id}</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.id}>{employee.Name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            name="program"
            value={testCase.ReportedByDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assigned To:
          </label>
          <select
            name="AssignedToEmployee_id"
            value={testCase.AssignedToEmployee_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.AssignedToEmployee_id}</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.id}>{employee.Name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status :
          </label>
          <select
            name="Status"
            value={testCase.Status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.Status}</option>
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
            name="Priority"
            value={testCase.Priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.Priority}</option>
            {priorityOptions.map(priorityOptions => (
              <option key={priorityOptions.id} value={priorityOptions.name}>{priorityOptions.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolution :
          </label>
          <select
            type="text"
            name="Resolution"
            value={testCase.Resolution}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <option value="">{testCase.Resolution}</option>
          {resolutionOptions.map((resolutionOptions) => (
              <option key={resolutionOptions.id} value={resolutionOptions.name}>
                {resolutionOptions.name}
              </option>
            ))}
            </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolution Version:
          </label>
          <select
            type="text"
            name="ResolutionVersion"
            value={testCase.ResolutionVersion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
           <option value="">{testCase.ResolutionVersion}</option>
          {resolutionVersionOptions.map((resolutionVersionOptions) => (
              <option key={resolutionVersionOptions.id} value={resolutionVersionOptions.name}>
                {resolutionVersionOptions.name}
              </option>
            ))}
            </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resolved By:
          </label>
          <select
            name="ResolvedByEmployee_id"
            value={testCase.ResolvedByEmployee_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.ResolvedByEmployee_id}</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.id}>{employee.Name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            name="ResolvedByDate"
            value={testCase.ResolvedByDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tested By:
          </label>
          <select
            name="TestedByEmployee_id"
            value={testCase.TestedByEmployee_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{testCase.TestedByEmployee_id}</option>
            {employees.map((employee, index) => (
                <option key={index} value={employee.id}>{employee.Name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            name="TestedByDate"
            value={testCase.TestedByDate}
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
            name="Comments"
            value={testCase.Comments}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reproducible: {testCase.Reproducible ? "Yes" : "No"}
          </label>
          <input
            type = "checkbox"
            name="Reproducible"
            checked =  {testCase.Reproducible}
            onChange={handleChange}
            value={testCase.Reproducible ? "Yes" : "No"}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Treated As Deferred: {testCase.TreatedAsDeferred ? "Yes" : "No"}
          </label>
          <input
            type="checkbox"
            name = "TreatedAsDeferred"
            checked = {testCase.TreatedAsDeferred}
            onChange={handleChange}
            value={testCase.TreatedAsDeferred ? "Yes" : "No"}
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
            onClick={handleClose}
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
