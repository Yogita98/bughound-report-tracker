import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/Registration/registration";
import TestCase from "./components/TestCase/testCase";
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
          </Routes>
        </Router>
      </div>
  );
}

export default App;
