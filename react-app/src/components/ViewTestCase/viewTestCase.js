import React from 'react';

const mockTestCase = {
  program: "Example Program",
  reportType: "Bug",
  severity: "High",
  problemSummary: "Lorem ipsum dolor sit amet",
  suggestedFix: "N/A",
  reportedBy: "John Doe",
  assignedTo: "Jane Doe",
  comments: "Pending review",
  status: "Open",
  priority: "Urgent",
  resolutionVersion: "v1.0.1",
  resolvedBy: "TBD",
  date: "2022-01-01",
  testedBy: "Tester Name",
  reproducible: true,
  treatedAsDeferred: false,
};

const ViewTestCase = ({ onClose, onEdit }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">View Test Case</h2>
            <form className="space-y-4">
                {/* Display fields as read-only or as text paragraphs */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Program:</label>
                    <input type="text" value={mockTestCase.program} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Report Type:</label>
                    <input type="text" value={mockTestCase.reportType} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Severity:</label>
                    <input type="text" value={mockTestCase.severity} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Comments :</label>
                    <input type="text" value={mockTestCase.suggestedFix} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Comments :</label>
                    <input type="text" value={mockTestCase.suggestedFix} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reported By :</label>
                    <input type="text" value={mockTestCase.reportedBy} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To :</label>
                    <input type="text" value={mockTestCase.assignedTo} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Resolved By :</label>
                    <input type="text" value={mockTestCase.resolvedBy} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Resolution version :</label>
                    <input type="text" value={mockTestCase.resolutionVersion} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date :</label>
                    <input type="text" value={mockTestCase.date} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status :</label>
                    <input type="text" value={mockTestCase.status} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority :</label>
                    <input type="text" value={mockTestCase.priority} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Program:</label>
                    <input type="text" value={mockTestCase.program} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reproducible:</label>
                    <input type="text" value={mockTestCase.reproducible ? "Yes" : "No"} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div className="flex gap-4">
                    <button type="button" onClick={onEdit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Edit</button>
                    <button type="button" onClick={onClose} className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Close</button>
                </div>
            </form>
        </div>
    );
};

export default ViewTestCase;
