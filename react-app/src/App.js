import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/adminDashboard";
import EditTestForm from "./components/EditTestForm/editTestForm";
import NewEmployee from "./components/dashboard/NewEmployee";
import NewFunctionalArea from "./components/NewFunctionalArea/newFunctionalArea";
import NewProgram from "./components/NewProgram/newProgram";
import Register from "./components/Registration/registration";
import TestCase from "./components/TestCase/testCase";
import ViewTestCase from "./components/ViewTestCase/viewTestCase";
import Dashboard from "./components/dashboard/dashboard";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import Login from "./components/login/login";
import EmployeeView from "./components/dashboard/EmployeeView";
// import TestLogin from "./login"

function App() {
  return (
    <div className="h-full w-full">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/createTestForm" element={<TestCase />} />
            <Route path="/editTestForm" element={<EditTestForm />} />
            <Route path="/viewTestForm" element={<ViewTestCase />} />
            <Route path="/addNewEmployee" element={<NewEmployee />} />
            <Route path="/addNewFunctionalArea" element={<NewFunctionalArea />} />
            <Route path="/addNewProgram" element={<NewProgram />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/edit-employees" element={<EmployeeView />} />
            {/* <Route path="/test" element={<TestLogin />}/> */}
          </Routes>
        </Router>
      </div>
  );
}

export default App;