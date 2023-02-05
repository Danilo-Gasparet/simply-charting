import "./CountryRow.css";

const CountryRow = (props) => {
    // Initializing a style object that will be added to the bar 
    const barStyle = {
      '--from-width': props.country.PrevPopulationPercentage + '%', 
      '--to-width': props.country.CurrPopulationPercentage + '%',
      'animationName': 'grow-or-shrink',
      'animationDuration': '4s',
      'animationFillMode':'forwards',
      'backgroundColor' : 'rgba('+ props.country.Color +', 0.6)',
      'borderColor' : 'rgba('+ props.country.Color +', 1)'
    };

    const barClass = `
      h-4 
      my-1 
      border shadow 
      rounded-md
    `

    return ( 
        <div className="grid grid-cols-12 gap-4">
  
        {/* Column 1 displaying the country name */}
        <div className="col-span-2 text-center break-words" >{props.country.Country}</div>

        {/* Column 2 displaying the relative population size to largest as a percentage. This will be displayed as a growing bar */}
        <div className="col-span-8" >
          <div style={barStyle} className={barClass}></div>
        </div>

        {/* Column 3 displaying the population size as a number */}
        <div className="col-span-2 text-right break-words" >{props.country.Population}</div>
      </div>
     );
}

export default CountryRow ;