import "./App.css";
import React, { useState, useEffect } from "react";
import { processBarChartData } from "./utils/utils";
import Navbar from "./components/Navbar/Navbar";
//import Filters from "./components/Filters/Filters.js";
//import Timer from "./components/Countdown/Countdown";
import Loading from "./components/States/Loading";
import BarChart from "./components/Charts/BarChart/BarChart";

function App() {
  // Populating the data object with the json key values
  const data = require("./data/generated.json");

  // Assigning the finishedLoading flag to false. Will be updated after the data object has been processed
  const [loading, setLoading] = useState(true);

  // Storing the year as a state variable
  const [dataMap, setDataMap] = useState(new Map());

  // Use effect hook to process the data, and display a loading screen if needed.
  useEffect(() => {
    if (loading) {
      setDataMap(processBarChartData(data));
      setLoading(false);
    } 
  });

  return (
    <div className="shell bg-zinc-700 font-Monaco text-zinc-100 h-screen">
      <div className="navbar">
        <Navbar></Navbar>
      </div>
      {loading ? (
        <div className="loading">
          <Loading></Loading>
        </div>
      ) : (
        <div className="content-area p-5">
          <div className="graph mb-16">
            <BarChart dataMap={dataMap}></BarChart>
          </div>
          {/** 
          <div className="filters">
            <Filters></Filters>
          </div>
          <div className="filters">
            <Timer seconds={60}></Timer>
          </div>
          */}
        </div>
      )}
    </div>
  );
}
export default App;
