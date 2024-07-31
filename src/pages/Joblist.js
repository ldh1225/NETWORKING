import React from "react";
import Profile from "../components/Job/Profile";
import Banner from "../components/Job/Banner";
import Job from "../components/Job/Job";
import "../styles/Job/Joblist.css";

const JoblistPage = () => {
  return (
    <div className="joblist-page"> 
      <div className="app">
        <div className="main">
          <div className="leftColumn">
            <Profile />
          </div>
          <div className="rightColumn">
            <Banner />
            <Job />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoblistPage;
