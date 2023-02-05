export function processBarChartData(data) {
  console.log("Processing raw data...");
  const dataMap = new Map();

  for (let year of data) {
    let tempArray = [];

    const sortedCountries = sortCountriesByPopSize(year.Countries);

    for (let i = 0; i < sortedCountries.length; i++) {
        let tempObject = {
            "_id": sortedCountries[i]._id,
            "Country": sortedCountries[i].Country,
            "Population": sortedCountries[i].Population,
            "PrevRank": getPrevRank(sortedCountries[i].Country, dataMap.get(Number(year.Year)-1), i),
            "CurrRank": i,
            "PrevPopulationPercentage": getPrevPopPercentage(sortedCountries[i].Country, dataMap.get(Number(year.Year)-1)),
            "CurrPopulationPercentage": getRelativeCurrPopPercentage(i, sortedCountries)
        };
        tempArray.push(tempObject)
    }
    dataMap.set(year.Year, tempArray);
  }
  return dataMap;
};

function sortCountriesByPopSize(arrCountries){
    // TODO - Refactor - Standard JS sort method uses insertion sort which may not be the best option for performance.
    return arrCountries.sort((C1, C2) => (C1.Population < C2.Population) ? 1 : (C1.Population > C2.Population) ? -1 : 0);
}

function getPrevRank(country, prevYearArray, index){
    return prevYearArray !== undefined ? prevYearArray.findIndex((el) => el.Country === country) : index;
};

function getPrevPopPercentage(country, prevYearArray){
    return prevYearArray !== undefined ? prevYearArray[getPrevRank(country, prevYearArray)].CurrPopulationPercentage : 0;
};

function getRelativeCurrPopPercentage(currentIndex, sortedCountries){
    return currentIndex === 0 ? 100 : Math.round(( sortedCountries[currentIndex].Population / sortedCountries[0].Population ) * 100);
};