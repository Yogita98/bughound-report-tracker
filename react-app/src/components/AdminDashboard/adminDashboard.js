import {
  ArrowDownTrayIcon,
  ChevronUpDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
  
  const AdminDashboard = () => {
    const navigate = useNavigate();
    const [testCases, setTestCases] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTestCases, setFilteredTestCases] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [displayedTestCases, setDisplayedTestCases] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
  
    useEffect(() => {
      fetchBugReports();
    }, []);
  
    const fetchBugReports = async () => {
      try {
        // Fetching bug reports
        const response = await fetch("http://localhost:8000/bug-reports/");
        if (!response.ok) {
          throw new Error("Network response was not ok for bug reports");
        }
        const data = await response.json();
  
        // Fetching employee names
        const employeeResponse = await fetch(
          "http://localhost:8000/api/employees-names/"
        );
        if (!employeeResponse.ok) {
          throw new Error("Network response was not ok for employee names");
        }
        const employees = await employeeResponse.json();
        console.log(employees);
  
        // Convert employee array to an ID-to-name map
        const employeeMap = employees.reduce((acc, employee) => {
          acc[employee.id] = employee.Name; // Assuming the employee object has 'id' and 'name' properties
          return acc;
        }, {});
  
        // Replace employee IDs in the bug reports with names using the map
        const testCases = data.map((report) => ({
          id: report.id,
          ReportTypeID: report.ReportTypeID,
          description: report.ProblemDescription,
          date: report.ReportedByDate,
          status: report.Status,
          testedBy: employeeMap[report.TestedByEmployee] || "Unknown",
          comments: report.Comments,
          Status: report.Status,
          TestedByEmployee_id: employeeMap[report.TestedByEmployee] || "Unknown", // Use 'Unknown' if no matching employee found
          Comments: report.Comments,
          ProblemSummary: report.ProblemSummary,
          ProblemDescription: report.ProblemDescription,
          Reproducible: report.Reproducible,
          SuggestedFix: report.SuggestedFix,
          ReportedByDate: report.ReportedByDate,
          Priority: report.Priority,
          Resolution: report.Resolution,
          ResolutionVersion: report.ResolutionVersion,
          ResolvedByDate: report.ResolvedByDate,
          TestedByDate: report.TestedByDate,
          AssignedToEmployee_id:
            employeeMap[report.AssignedToEmployee] || "Unknown",
          Program: report.Program,
          FunctionalArea_id: report.FunctionalArea,
          ReportedByEmployee_id:
            employeeMap[report.ReportedByEmployee] || "Unknown",
          Severity: report.Severity,
          TreatedAsDeferred: report.TreatedAsDeferred,
        }));
  
        // Example: Setting the state or logging to console
        console.log(testCases);
        setTestCases(testCases);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    //Download the test case
    const downloadPDF = (testCaseDetails) => {
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text("Test Case Details", 20, 10);
      const fields = [
        ["Bug ID", testCaseDetails.id],
        ["Program", testCaseDetails.Program],
        ["Functional Area", testCaseDetails.FunctionalArea_id],
        ["Report Type", testCaseDetails.ReportTypeID],
        ["Severity", testCaseDetails.Severity],
        ["Problem Summary", testCaseDetails.ProblemSummary],
        ["Problem Description", testCaseDetails.ProblemDescription],
        ["Suggested Fix", testCaseDetails.SuggestedFix],
        ["Reported By", testCaseDetails.ReportedByEmployee_id],
        ["Reported Date", testCaseDetails.ReportedByDate],
        ["Assigned To", testCaseDetails.AssignedToEmployee_id],
        ["Status", testCaseDetails.Status],
        ["Priority", testCaseDetails.Priority],
        ["Resolution", testCaseDetails.Resolution],
        ["Resolution Version", testCaseDetails.ResolutionVersion],
        ["Resolved By", testCaseDetails.ResolvedByEmployee_id],
        ["Resolved Date", testCaseDetails.ResolvedByDate],
        ["Tested By", testCaseDetails.TestedByEmployee_id],
        ["Tested Date", testCaseDetails.TestedByDate],
        ["Comments", testCaseDetails.Comments],
        ["Reproducible", testCaseDetails.Reproducible ? "Yes" : "No"],
        ["Deferred", testCaseDetails.TreatedAsDeferred ? "Yes" : "No"],
      ];
      fields.forEach((field, index) => {
        const y = 20 + 10 * index;
        doc.text(`${field[0]}: ${field[1]}`, 20, y);
      });
      doc.save("test_case_details.pdf");
    };
    //XML format download
    const downloadXML = (testCaseDetails) => {
      const xmlContent = `
          <?xml version="1.0" encoding="UTF-8"?>
        <TestCase>
          <BugID>${testCaseDetails.id}</BugID>
          <Program>${testCaseDetails.Program}</Program>
          <FunctionalArea>${testCaseDetails.FunctionalArea_id}</FunctionalArea>
          <ReportType>${testCaseDetails.ReportTypeID}</ReportType>
          <Severity>${testCaseDetails.Severity}</Severity>
          <ProblemSummary>${testCaseDetails.ProblemSummary}</ProblemSummary>
         <ProblemDescription>${
           testCaseDetails.ProblemDescription
         }</ProblemDescription>
         <SuggestedFix>${testCaseDetails.SuggestedFix}</SuggestedFix>
          <ReportedBy>${testCaseDetails.ReportedByEmployee_id}</ReportedBy>
          <ReportedDate>${testCaseDetails.ReportedByDate}</ReportedDate>
         <AssignedTo>${testCaseDetails.AssignedToEmployee_id}</AssignedTo>
         <Status>${testCaseDetails.Status}</Status>
         <Priority>${testCaseDetails.Priority}</Priority>
         <Resolution>${testCaseDetails.Resolution}</Resolution>
          <ResolutionVersion>${
            testCaseDetails.ResolutionVersion
          }</ResolutionVersion>
          <ResolvedBy>${testCaseDetails.ResolvedByEmployee_id}</ResolvedBy>
          <ResolvedDate>${testCaseDetails.ResolvedByDate}</ResolvedDate>
          <TestedBy>${testCaseDetails.TestedByEmployee_id}</TestedBy>
         <TestedDate>${testCaseDetails.TestedByDate}</TestedDate>
          <Comments>${testCaseDetails.Comments}</Comments>
          <Reproducible>${
           testCaseDetails.Reproducible ? "Yes" : "No"
         }</Reproducible>
         <Deferred>${testCaseDetails.TreatedAsDeferred ? "Yes" : "No"}</Deferred>
        </TestCase>
    `;
  
      const blob = new Blob([xmlContent], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = 'test_case_details.xml';
      link.click();
      URL.revokeObjectURL(url);
    };
  
    const handleCreateTestCase = () => {
      navigate("/createTestForm");
    };
    const handleNewEmployee = () => {
        navigate("/addNewEmployee");
      };
      const handleNewProgram = () => {
        navigate("/addNewProgram");
      };
      const handleNewFunctionalArea = () => {
        navigate("/addNewFunctionalArea");
      };
    const handleEditTestCase = () => {
      navigate("/editTestForm");
    };
  
    const viewTestCase = (testCase) => {
      console.log(testCase);
      navigate(`/viewTestForm`, { state: { ...testCase } });
    };
  
   
    //Delete Bug report particular to ID
    const deleteTestCase = async (testCaseId) => {
      try {
        const response = await fetch(
          `http://localhost:8000/bug-reports/${testCaseId}/`,
          {
            method: "DELETE",
          }
        );
  
        if (response.ok) {
          alert("Test case deleted successfully!");
          navigate("/dashboard"); //stay on the same dashboard
          fetchBugReports();
        } else {
          const errorText = await response.text();
          alert(`Failed to delete test case: ${errorText}`);
        }
      } catch (error) {
        console.error("Error deleting test case:", error);
        alert("Error deleting test case, please try again.");
      }
    };
  
    const tableHead = [
      "Test ID",
      "Description",
      "Date Created",
      "Status",
      "Tested By",
      "Comments",
      "Action",
    ];
  
    const handleSearch = (e) => {
      const query = e.target.value.trim();
      setSearchQuery(query);
      const filtered = testCases.filter((testCase) =>
        testCase.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTestCases(filtered);
      setDropdownOptions(filtered.map((testCase) => testCase.description));
      setOpenDropdown(dropdownOptions.length > 0 && query.trim().length > 0);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearchButtonClick();
      }
    };
  
    const handleSelect = (option) => {
      setSearchQuery(option);
      setSelectedOption(option);
      const filtered = testCases.filter((testCase) =>
        testCase.description.includes(option)
      );
      setFilteredTestCases(filtered);
      setDropdownOptions([]);
      setDisplayedTestCases(filtered);
      setSearchQuery("");
    };
  
    const handleSearchButtonClick = () => {
      if (searchQuery.trim() === "") {
        setDisplayedTestCases(testCases);
      } else {
        const filtered = testCases.filter((testCase) =>
          testCase.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTestCases(filtered);
        setSearchQuery("");
        setOpenDropdown(false);
        setDisplayedTestCases(filtered);
      }
    };
  
    const StatusChip = ({ status }) => {
      const statusStyles = {
        Passed: "bg-green-100 text-green-800",
        Failed: "bg-red-100 text-red-800",
        "In Progress": "bg-yellow-100 text-yellow-800",
      };
      const defaultStyle = "bg-gray-100 text-gray-800";
      const chipStyle = statusStyles[status] || defaultStyle;
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${chipStyle}`}
        >
          {status}
        </span>
      );
    };
  
    return (
      <Card className="h-full w-full">
        <CardHeader className="flex flex-wrap justify-between items-center rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Test Cases Dashboard
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Test Case reporting Dashboard
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:">
              <Button
                variant="outlined"
                size="sm"
                color="gray"
                onClick={handleCreateTestCase}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-5" />
                Add New Test Case
              </Button>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:">
              <Button
                variant="outlined"
                size="sm"
                color="gray"
                onClick={handleNewEmployee}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-5" />
                Add New Employee
              </Button>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:">
              <Button
                variant="outlined"
                size="sm"
                color="gray"
                onClick={handleNewProgram}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-5" />
                Add New Program Type
              </Button>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:">
              <Button
                variant="outlined"
                size="sm"
                color="gray"
                onClick={handleNewFunctionalArea}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-5" />
                Add New Functional Area
              </Button>
            </div>
          </div>
          <div className="mb-3 md:w-96">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <Input
                type="search"
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                id="exampleSearch"
                placeholder="Search Test Case"
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
              />
              {openDropdown && dropdownOptions.length > 0 && (
                <div className="absolute z-10 inset-x-0 top-full bg-white rounded-b border border-t-0 border-solid border-neutral-300 max-h-48 overflow-y-auto">
                  {dropdownOptions.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pl-2">
                <Button variant="text" className="p-0 z-10">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 cursor-pointer"
                    aria-hidden="true"
                    onClick={handleSearchButtonClick}
                  />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {tableHead.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== tableHead.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedTestCases.length > 0
                ? displayedTestCases.map((testCase, index) => {
                    const isLast = index === displayedTestCases.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={testCase.id}>
                        <td className={classes}>{testCase.id}</td>
                        <td className={classes}>{testCase.description}</td>
                        <td className={classes}>{testCase.date}</td>
                        <td className={classes}>
                          <StatusChip status={testCase.status} />
                        </td>
                        <td className={classes}>{testCase.testedBy}</td>
                        <td className={classes}>{testCase.comments}</td>
                        <td className={classes}>
                          <Button
                            variant="text"
                            className="p-0"
                            onClick={() => viewTestCase(testCase)}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="text"
                            className="p-0"
                            onClick={handleEditTestCase}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="text"
                            className="p-0"
                            onClick={() => downloadPDF(testCase)}
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="text"
                            className="p-0"
                            onClick={() => deleteTestCase(testCase.id)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : testCases.map((testCase, index) => {
                    const isLast = index === testCases.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={testCase.id}>
                        <td className={classes}>{testCase.id}</td>
                        <td className={classes}>{testCase.description}</td>
                        <td className={classes}>{testCase.date}</td>
                        <td className={classes}>
                          <StatusChip status={testCase.status} />
                        </td>
                        <td className={classes}>{testCase.testedBy}</td>
                        <td className={classes}>{testCase.comments}</td>
                        <td className={classes}>
                          <Button
                            variant="text"
                            className="p-0"
                            onClick={() => viewTestCase(testCase)}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="text"
                            className="p-0"
                            onClick={handleEditTestCase}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Button>
                            <Button
                              variant="text"
                              className="p-0"
                              onClick={() => setShowOptions(!showOptions)}
                            >
                              <ArrowDownTrayIcon className="h-5 w-5" />
                            </Button>
                            {showOptions && (
                              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div
                                  className="py-1"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="options-menu"
                                >
                                  <button
                                    type="button"
                                    className="text-gray-700 block w-full px-4 py-2 text-sm text-left"
                                    onClick={() => downloadPDF(testCase)}
                                    role="menuitem"
                                  >
                                    Download PDF
                                  </button>
                                  <button
                                    type="button"
                                    className="text-gray-700 block w-full px-4 py-2 text-sm text-left"
                                    onClick={() => downloadXML(testCase)}
                                    role="menuitem"
                                  >
                                    Download XML
                                  </button>
                                </div>
                              </div>
                            )}
                          <Button
                            variant="text"
                            className="p-0"
                            onClick={() => deleteTestCase(testCase.id)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };
  
  export default AdminDashboard;
  