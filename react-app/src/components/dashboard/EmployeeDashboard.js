import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Dashboard from "./dashboard";
import NewEmployee from "./NewEmployee";

const EmployeeDashboard = () => {
  const location = useLocation();
  const [isadmin, setIsAdmin] = useState(location.state.user.is_superuser)
  const token = localStorage.getItem('access-token')
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  

  const fetchEmployees = async () => {
    const employeeResponse = await fetch("http://localhost:8000/api/employees-names/", {
        headers
      });
      if (!employeeResponse.ok) {
        throw new Error("Network response was not ok for employee names");
      }
      const employees = await employeeResponse.json();
      console.log(employees);
      const admin = employees.find(emp => emp.is_superuser === true);

  }

  useEffect(() => {
    fetchEmployees()
    // fetchBugReports();
  }, []);

  return(
    <div>
      {isadmin && <NewEmployee />}
      {/* {!isadmin && <Dashboard />} */}
    </div>
    
  )

}

export default EmployeeDashboard;