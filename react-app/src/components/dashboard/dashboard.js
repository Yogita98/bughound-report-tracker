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
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTestCases, setFilteredTestCases] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [displayedTestCases, setDisplayedTestCases] = useState([]);

  useEffect(() => {
    fetchBugReports();
  }, []); // The empty array ensures this effect runs only once after the initial render

  const fetchBugReports = async () => {
    try {
      const response = await fetch("http://localhost:8000/bug-reports/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setTestCases(
        data.map((report) => ({
          id: report.id, // Assuming ReportTypeID can serve as a unique ID
          reporttypeid: report.ReportTypeID,
          description: report.ProblemDescription,
          date: report.ReportedByDate, // Adjust according to your model if you have this field
          status: report.Status,
          testedBy: report.TestedByEmployee, // Adjust depending on how you've structured your data
          comments: report.Comments,
        }))
      );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // Function to handle creating a new test case
  const handleCreateTestCase = () => {
    navigate("/createTestForm");
  };
  // Navigate to Edit   test case - Temp (API for corresponding id)
  const handleEditTestCase = () => {
    navigate("/editTestForm");
  };
  // Navigate to Test Case Details - Temp (API for corresponding id)
  const viewTestCase = () => {
    navigate("/viewTestForm");
  };

  // Navigate to Test Case Details - Temp (API for corresponding id)
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

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    console.log("Search Query:", query);
    setSearchQuery(query);
    
    // Filter test cases based on the search query
    const filteredTestCases = testCases.filter((testCase) => {
      return testCase.description.toLowerCase().includes(query.toLowerCase());
    });
    console.log("Filtered Test Cases:", filteredTestCases);
    setFilteredTestCases(filteredTestCases);

    // Update dropdown options based on the filtered test cases
    setDropdownOptions(filteredTestCases.map((testCase) => testCase.description));
    
    // Ensure dropdown remains visible if there are matching options
    setOpenDropdown(dropdownOptions.length > 0 && query.trim().length > 0);

  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // If Enter key is pressed, filter the test cases
      handleSearchButtonClick();
    }
  }

  const handleSelect = (option) => {
    // Update search query with the selected option
    setSearchQuery(option);
    setSelectedOption(option);
  
    // Filter test cases based on the selected option
    const filteredTestCases = testCases.filter((testCase) =>
      testCase.description.includes(option)
    );
    setFilteredTestCases(filteredTestCases);

    // Clear dropdown options after selection
    setDropdownOptions([]);

    // Set displayed test cases to the selected option
    setDisplayedTestCases(filteredTestCases);

    // Reset search query after selecting an option
    setSearchQuery("");
  };
  
  const handleSearchButtonClick = () => {
    console.log("Search Button Clicked");
    // Check if the search query is empty
    
    if (searchQuery.trim() === "" ) {
      // Set displayed test cases to all bug reports
    setDisplayedTestCases(testCases);
    } else {
      // If there is a search query, filter bug reports based on the current search query
      const filteredTestCases = testCases.filter((testCase) =>
        testCase.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTestCases(filteredTestCases);

      // Reset search query after performing search
      setSearchQuery("");
      // Close dropdown after selection
      setOpenDropdown(false);

      // Set displayed test cases to the filtered test cases
      setDisplayedTestCases(filteredTestCases);
  }
  };

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
              <Button
                variant="text"
                className="p-0 z-10"
               >
                <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" aria-hidden="true" onClick={handleSearchButtonClick}/>
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
            {displayedTestCases.length > 0 ? (
    displayedTestCases.map(({ id, description, date, status, testedBy, comments }, index) => {
      const isLast = index === displayedTestCases.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      return (
        <tr key={id}>
          <td className={classes}>
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {id}
                </Typography>
              </div>
            </div>
          </td>
          <td className={classes}>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-normal opacity-50">
                {description}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-normal opacity-50">
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
              <Typography variant="small" color="blue-gray" className="font-normal opacity-50">
                {testedBy}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-normal opacity-50">
                {comments}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <Button variant="text" className="p-0" onClick={viewTestCase}>
              <EyeIcon className="h-5 w-5" />
            </Button>
            <Button variant="text" className="p-0" onClick={handleEditTestCase}>
              <PencilIcon className="h-5 w-5" />
            </Button>
            <Button variant="text" className="p-0" onClick={() => navigateToTestCase(id)}>
              <ArrowDownTrayIcon className="h-5 w-5" />
            </Button>
            <Button variant="text" className="p-0" onClick={() => navigateToTestCase(id)}>
              <TrashIcon className="h-5 w-5" />
            </Button>
          </td>
        </tr>
      );
    })
  ) : (
            testCases.map(
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
                        onClick={viewTestCase}
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
              })
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
