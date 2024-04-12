import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditTestForm from "./components/EditTestForm/editTestForm";
import Register from "./components/Registration/registration";
import TestCase from "./components/TestCase/testCase";
import ViewTestCase from "./components/ViewTestCase/viewTestCase";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";

function App() {
  return (
    <div className="h-full w-full">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createTestForm" element={<TestCase />} />
            <Route path="/editTestForm" element={<EditTestForm />} />
            <Route path="/viewTestForm" element={<ViewTestCase />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;