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
import React, { useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState([]);
  useEffect(() => {
    fetchBugReports();
}, []); // The empty array ensures this effect runs only once after the initial render

const fetchBugReports = async () => {
    try {
        const response = await fetch('http://localhost:8000/bug-reports/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setTestCases(data.map((report) => ({
            id: report.ReportTypeID, // Assuming ReportTypeID can serve as a unique ID
            description: report.ProblemDescription,
            date: report.ReportedByDate, // Adjust according to your model if you have this field
            status: report.Status,
            testedBy: report.TestedByEmployee, // Adjust depending on how you've structured your data
            comments: report.Comments,
        })));
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

  
  // Function to handle creating a new test case
  const handleCreateTestCase = () => {
    navigate("/createTestForm");
  };

  // Navigate to Test Case Details
  const navigateToTestCase = (testCaseId) => {
    navigate(`/testCaseDetail/${testCaseId}`);
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

  //dynamic chip that renders color based on the status rendered
  const StatusChip = ({ status }) => {
    // Determine the chip's style based on the status
    const statusStyles = {
      Passed: "bg-green-100 text-green-800",
      Failed: "bg-red-100 text-red-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
    };

    // Fallback style
    const defaultStyle = "bg-gray-100 text-gray-800";

    // Get the specific style for the current status, or use the fallback
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
        </div>
        <div className="mb-3 md:w-96">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <Input
              type="search"
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              id="exampleSearch"
              placeholder="Search Test Case"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pl-2">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
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
            {testCases.map(
              (
                { id, description, date, status, testedBy, comments },
                index
              ) => {
                const isLast = index === testCases.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {" "}
                            {id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-50"
                        >
                          {" "}
                          {description}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-50"
                        >
                          {" "}
                          {date}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <StatusChip status={status} />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-50"
                        >
                          {" "}
                          {testedBy}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-50"
                        >
                          {" "}
                          {comments}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="text"
                        className="p-0"
                        onClick={() => navigateToTestCase(testCases.id)}
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="text"
                        className="p-0"
                        onClick={() => navigateToTestCase(testCases.id)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="text"
                        className="p-0"
                        onClick={() => navigateToTestCase(testCases.id)}
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="text"
                        className="p-0"
                        onClick={() => navigateToTestCase(testCases.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
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

export default Dashboard;
