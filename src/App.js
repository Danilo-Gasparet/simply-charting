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

  // Populating the color pallet with the json config values
  const colorPallet = require("./data/colors.json");

  // Assigning the loading flag to true. Will be updated after the data object has been processed.
  // Allows the app wait while the data is being processed.
  const [loading, setLoading] = useState(true);

  // Storing the processed data map as state variable for future use.
  // A Map data structure has been used, as it allows for faster access to a years worth of data than if an array had to be iterated over.
  const [dataMap, setDataMap] = useState(new Map());

  // Use effect hook to process the data, and display a loading screen while it waits for the data to be processed.
  useEffect(() => {
    if (loading) {
      setTimeout(function() {
        // Update the state variables
        setDataMap(processBarChartData(data, colorPallet));
        setLoading(false);
      }, 2000);
    }
  });

  return (
    // Render the app component. Set the tailwind.css classes that will be applied to the whole app.
    <div className="bg-zinc-700 font-Monaco text-zinc-100 min-h-screen">
      <Navbar></Navbar>
      {loading ? (
        <>
          <Loading></Loading>
        </>
      ) :
      (
       
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
