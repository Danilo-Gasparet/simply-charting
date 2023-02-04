import React, { useState, useEffect } from "react";

const BarChart = ({dataMap}) => {
  const dataArray = Array.from(dataMap, ([year, countries]) => ({ year, countries }));
  console.log("Data: ", dataArray)

  // Fetch the starting year from the prop. The array is already sorted. 
  const startYear = dataArray[0].year;

  // Fetch the ending year from the prop. The array is already sorted.
  const endYear = dataArray[dataArray.length -1].year;

  // State Variable: A year worth of data will be updated using an effect hook in conjunction with a timer. 
  const [yearData, setYearData] = useState([]);

  // State Variable: A year worth of data will be updated using an effect hook in conjunction with a timer. 
  const [yearIndex, setYearIndex] = useState(0);

   
  useEffect(() => {
    // Exit early when we reach the final year
    if (yearIndex >= dataArray.length) return;

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setYearData(dataArray[yearIndex]);
      setYearIndex(yearIndex + 1)
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // Add yearData as a dependency to re-rerun the effect when the va;ue is updated
  }, [yearData]);


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
        {
          yearData.countries.map((country) => (
            <div className="grid grid-cols-12 gap-4" key={country._id}>
  
            {/* Column 1 displaying the country name */}
            <div className="col-span-2 text-center break-words" >{country.Country}</div>
    
            {/* Column 2 displaying the relative population size to largest as a percentage. This will be displayed as a growing bar */}
            <div className="col-span-8" >
              <div className="graph-bar h-4 my-1 bg-lime-300/50 border shadow rounded-md border-lime-300" style={getBarStyle(country)}></div>
            </div>
    
            {/* Column 3 displaying the population size as a number */}
            <div className="col-span-2 text-right break-words" >{country.Population}</div>
          </div>
          ))}
      </div>
    );
  }

  function getBarStyle(country){
    return {
      width: country.CurrPopulationPercentage+"%",
      
    };
  }
};

export default BarChart;
