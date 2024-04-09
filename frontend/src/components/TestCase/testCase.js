import React, { useState } from 'react';

const TestCase = () => {
    // Initial state for the form data
    const [formData, setFormData] = useState({
        program: '',
        reportType: '',
        severity: '',
        problemSummary: '',
        suggestedFix: '',
        reportedBy: '',
        assignedTo: '',
        comments: '',
        status: '',
        priority: '',
        resolution: '',
        resolutionVersion: '',
        resolvedBy: '',
        date: '',
        testedBy: '',
        reproducible: false,
        treatedAsDeferred: false,
    });

    // Handle changes in form inputs
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Submit the form data
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/submit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Submission successful', data);
                // Optional: Reset form or redirect the user
            } else {
                console.error('Submission failed');
                // Handle response errors here
            }
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Create New Test Case</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Program selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Program:</label>
                    <select
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option value="">Select Program</option>
                        {/* Dynamic options for programs */}
                    </select>
                </div>
                
                {/* Report Type selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Report Type:</label>
    <select
        name="reportType"
        value={formData.reportType}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Report Type</option>
        {/* Dynamic options for report types */}
    </select>
</div>

{/* Severity selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Severity:</label>
    <select
        name="severity"
        value={formData.severity}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Severity</option>
        {/* Dynamic options for severity */}
    </select>
</div>

{/* Problem Summary input */}
<div>
    <label className="block text-sm font-medium text-gray-700">Problem Summary:</label>
    <textarea
        name="problemSummary"
        value={formData.problemSummary}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
</div>

{/* Suggested Fix input */}
<div>
    <label className="block text-sm font-medium text-gray-700">Suggested Fix:</label>
    <textarea
        name="suggestedFix"
        value={formData.suggestedFix}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
</div>

{/* Reported By selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Reported By:</label>
    <select
        name="reportedBy"
        value={formData.reportedBy}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Reported By</option>
        {/* Dynamic options for reported by */}
    </select>
</div>

{/* Assigned To selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Assigned To:</label>
    <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Assigned To</option>
        {/* Dynamic options for assigned to */}
    </select>
</div>

{/* Status selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Status:</label>
    <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Status</option>
        {/* Dynamic options for status */}
    </select>
</div>

{/* Priority selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Priority:</label>
    <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Priority</option>
        {/* Dynamic options for priority */}
    </select>
</div>

{/* Resolution selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Resolution:</label>
    <select
        name="resolution"
        value={formData.resolution}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Resolution</option>
        {/* Dynamic options for resolution */}
    </select>
</div>

{/* Resolution Version selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Resolution Version:</label>
    <select
        name="resolutionVersion"
        value={formData.resolutionVersion}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Resolution Version</option>
        {/* Dynamic options for resolution version */}
    </select>
</div>

{/* Resolved By selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Resolved By:</label>
    <select
        name="resolvedBy"
        value={formData.resolvedBy}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Resolved By</option>
        {/* Dynamic options for resolved by */}
    </select>
</div>

{/* Date input */}
<div>
    <label className="block text-sm font-medium text-gray-700">Date:</label>
    <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
</div>

{/* Tested By selection */}
<div>
    <label className="block text-sm font-medium text-gray-700">Tested By:</label>
    <select
        name="testedBy"
        value={formData.testedBy}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="">Select Tested By</option>
        {/* Dynamic options for tested by */}
    </select>
</div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Comments:</label>
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </textarea>
                </div>
                
                {/* Reproducible checkbox */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reproducible:</label>
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
                    <label className="block text-sm font-medium text-gray-700">Treated as Deferred:</label>
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
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({})} // Reset form state
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestCase;
