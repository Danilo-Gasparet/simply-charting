import React, { useState, useEffect } from "react";
import CountryRow from "../ChartComponents/CountryRow";
import "./BarChart.css";

const BarChart = ({dataMap}) => {
  const dataArray = Array.from(dataMap, ([year, countries]) => ({ year, countries }));

  // State Variable: A year worth of data will be updated using an effect hook in conjunction with a timer. 
  const [yearData, setYearData] = useState([]);

  // State Variable: A year worth of data will be updated using an effect hook in conjunction with a timer. 
  const [yearIndex, setYearIndex] = useState(0);
   
  useEffect(() => {
    // Exit early when we reach the final year
    if (yearIndex >= dataArray.length){
      setYearData([]);
      setYearIndex(0)
    };

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setYearData(dataArray[yearIndex]);
      setYearIndex(yearIndex + 1)
    // If we are just starting the list dont wait 5s 
    }, yearIndex === 0 ? 0 : 4000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // Add yearData as a dependency to re-rerun the effect when the va;ue is updated
  }, [yearData, dataArray, yearIndex]);


  // ToDo - Improve responsiveness for smaller devices like mobile
  // Group common classes to clean up the template
  // Refactor - code duplication
  if(yearData.countries === undefined){
    return (
      <div className="bar-chart">
        {/* Display the current year */}
        <div>
          <h2 className="text-center text-5xl font-bold mb-4 text-zinc-400 ">World Population By Year</h2>
          <h3 className="text-center text-4xl font-bold mb-8">{yearData.year}</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bar-chart">
        {/* Display the current year */}
        <div>
          <h2 className="text-center text-5xl font-bold mb-4 text-zinc-400 ">World Population By Year</h2>
          <h3 className="text-center text-4xl font-bold mb-8">{yearData.year}</h3>
        </div>
  
        {/* Iterate over the current years countries and their data */}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          yearData.countries.map((country) => (
            <div key={country._id} style={orderStyle(country)} >
              <CountryRow country={country}></CountryRow>
            </div>
          ))}
        </div>      
      </div>
    );
  }

  function orderStyle(country){
    return{
      '--translate-start': String((country.PrevRank - country.CurrRank)*24) + 'px', 
      '--translate-end': 0,
      'animationName': 're-order',
      'animationDuration': '2s',
    }
  };

  
};

export default BarChart;
