import "./App.css";
import React, { useState, useEffect } from "react";
import { processBarChartData } from "./utils/utils";
import Navbar from "./components/Navbar/Navbar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
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
      setTimeout(function() {
        setDataMap(processBarChartData(data));
        setLoading(false);
      }, 2000);
    }
  });

  return (
    <div className="bg-zinc-700 font-Monaco text-zinc-100 min-h-screen">
      <Navbar></Navbar>
      {loading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          <div className="p-8 mb-8">
            <BarChart dataMap={dataMap}></BarChart>
          </div>
          <div>
            <ControlPanel></ControlPanel>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
