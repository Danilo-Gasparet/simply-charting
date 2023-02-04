import "./App.css";
import React, { useState, useEffect } from "react";
import { processBarChartData } from "./utils/utils";
import Navbar from "./components/Navbar/Navbar";
import Filters from "./components/Filters/Filters.js";
import Loading from "./components/States/Loading";
import BarChart from "./components/Charts/BarChart/BarChart";

function App() {
  // Populating the data object with the json key values
  const data = require("./data/generated.json");

  // Assigning the finishedLoading flag to false. Will be updated after the data object has been processed
  const [loading, setLoading] = useState(true);

  // Storing the year as a state variable
  const [dataMap, setDataMap] = useState(new Map());


  // use effect hook
  useEffect(() => {
    if (loading) {
      setDataMap(processBarChartData(data));
      setLoading(false);
    } else {
      // Todo
    }
  });

  return (
    <div className="shell">
      <div className="Navbar">
        <Navbar></Navbar>
      </div>
      {loading ? (
        <div className="loading">
          <Loading></Loading>
        </div>
      ) : (
        <>
          <div className="graph">
            <BarChart></BarChart>
          </div>
          <div className="filters">
            <Filters></Filters>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
