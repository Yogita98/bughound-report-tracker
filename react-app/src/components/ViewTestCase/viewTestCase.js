import React from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const ViewTestCase = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const testCaseDetails = location.state;
    const destination = location.state.dashboardType === 'admin' ? '/adminDashboard' : '/dashboard';

    // Function to handle the edit button click
    const handleEdit = () => {
        // Navigate to the edit test case page passing the test case details
        navigate(`/editTestForm`, { state: { testCaseDetails, dashboardType: destination  }});
    };

    const handleClose = () => {
        console.log("Cancel button clicked!");
        // Determine where to navigate based on the dashboard type from state
        navigate(destination);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">View Test Case</h2>
            <form className="space-y-4">
                {/* Display fields as read-only or as text paragraphs */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bug ID:</label>
                    <input type="text" value={testCaseDetails.id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Program:</label>
                    <input type="text" value={testCaseDetails.Program} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Functional Area:</label>
                    <input type="text" value={testCaseDetails.FunctionalArea_id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Report Type:</label>
                    <input type="text" value={testCaseDetails.ReportTypeID} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Severity:</label>
                    <input type="text" value={testCaseDetails.Severity} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Problem Summary:</label>
                    <input type="text" value={testCaseDetails.ProblemSummary} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Problem Description:</label>
                    <input type="text" value={testCaseDetails.ProblemDescription} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Suggested Fix:</label>
                    <input type="text" value={testCaseDetails.SuggestedFix} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reported By :</label>
                    <input type="text" value={testCaseDetails.ReportedByEmployee_id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date :</label>
                    <input type="text" value={testCaseDetails.ReportedByDate} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To :</label>
                    <input type="text" value={testCaseDetails.AssignedToEmployee_id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status :</label>
                    <input type="text" value={testCaseDetails.Status} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority :</label>
                    <input type="text" value={testCaseDetails.Priority} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Resolution:</label>
                    <input type="text" value={testCaseDetails.Resolution} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Resolution version :</label>
                    <input type="text" value={testCaseDetails.ResolutionVersion} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Resolved By :</label>
                    <input type="text" value={testCaseDetails.ResolvedByEmployee_id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date :</label>
                    <input type="text" value={testCaseDetails.ResolvedByDate} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tested By :</label>
                    <input type="text" value={testCaseDetails.TestedByEmployee_id} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date :</label>
                    <input type="text" value={testCaseDetails.TestedByDate} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Comments:</label>
                    <input type="text" value={testCaseDetails.Comments} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reproducible:</label>
                    <input type="text" value={testCaseDetails.Reproducible ? "Yes" : "No"} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Deferred:</label>
                    <input type="text" value={testCaseDetails.TreatedAsDeferred ? "Yes" : "No"} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Attachment:</label>
                    {testCaseDetails.attachmentUrl ? (
                        <a href={testCaseDetails.attachmentUrl} download className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
                            Download Attachment
                        </a>
                    ) : (
                        <span>No attachment available</span>
                    )}
                </div>

                <div className="flex gap-4">
                    <button 
                        type="button"
                        onClick={handleEdit} // Call handleEdit function when the button is clicked                        
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Edit
                        </button>
                    <button 
                        type="button" 
                        onClick={handleClose}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ViewTestCase;