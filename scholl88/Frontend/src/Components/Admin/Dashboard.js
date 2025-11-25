import React from "react";
import DashboardCards from "./DashboardCards";
import Charts from "./Charts";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container d-flex">
      <div className="dashboard-content flex-grow-1 p-4">
        <DashboardCards />
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
