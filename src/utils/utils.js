
// Function that processes the raw data and returns a Map {Year: Countries[]}
export function processBarChartData(data, colorPallet) {
  // Console log a message to let a developer know when the processing has started.
  console.log("Processing raw data...");

  // Initialize a new map that will be returned with the processed data
  const dataMap = new Map();

  // Loop over each year within the data array. Data = [{Year, []}, {Year, []}, {Year, []}]
  for (let year of data) {

    // Initialize an empty array that will be used to store a years country objects
    let tempArray = [];

    // Before any processing can happen, the countries in a year need to be sorted
    const sortedCountries = sortCountriesByPopSize(year.Countries);

    // Looping over the sortedCountries array and creating a new object for every country in that year.
    for (let i = 0; i < sortedCountries.length; i++) {
        let tempObject = {
            // The initial ID, nothing changes.
            "_id": sortedCountries[i]._id,
            // The country name, nothing changes.
            "Country": sortedCountries[i].Country,
            // The population, nothing changes.
            "Population": sortedCountries[i].Population,
            // The prev rank, call a method that determines the ranking (desc by pop) 
            "PrevRank": getPrevRank(sortedCountries[i].Country, dataMap.get(Number(year.Year)-1), i),
            // The current rank, uses the index as the array is already sorted.
            "CurrRank": i,
            // The previous population as a relative percentage compared to the largest country that year. Call a method to get this value.
            "PrevPopulationPercentage": getRelativePrevPopPercentage(sortedCountries[i].Country, dataMap.get(Number(year.Year)-1)),
            // The current population as a relative percentage compared to the largest country this year. Call a method to get this value.
            "CurrPopulationPercentage": getRelativeCurrPopPercentage(i, sortedCountries)
        };

        // Once the object has been created push it to the temp array
        tempArray.push(tempObject)
    }

    // Once a specific year has been processed and all its objects created, add it as a value to the Data Map using its year as a key.
    dataMap.set(year.Year, tempArray);
  }
  // Return the final processed map.
  return dataMap;
};

// Function that calls a sort method to sort the countries in a year by population size
function sortCountriesByPopSize(arrCountries){
    // TODO - Refactor - Standard JS sort method uses insertion sort which may not be the best option for performance, when large data sets are used.
    return arrCountries.sort((C1, C2) => (C1.Population < C2.Population) ? 1 : (C1.Population > C2.Population) ? -1 : 0);
}

// Function that gets the previous years rank for a specific country.
function getPrevRank(country, prevYearArray, index){
    return prevYearArray !== undefined ? prevYearArray.findIndex((el) => el.Country === country) : index;
};

// Function that calculates the previous population as a relative percentage compared to the largest country that year.
function getRelativePrevPopPercentage(country, prevYearArray){
    return prevYearArray !== undefined ? prevYearArray[getPrevRank(country, prevYearArray)].CurrPopulationPercentage : 0;
};

// Function that calculates the current population as a relative percentage compared to the largest country this year.
function getRelativeCurrPopPercentage(currentIndex, sortedCountries){
    return currentIndex === 0 ? 100 : Math.round(( sortedCountries[currentIndex].Population / sortedCountries[0].Population ) * 100);
};