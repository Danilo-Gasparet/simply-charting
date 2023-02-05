import styled, { keyframes } from 'styled-components';
import "./BarChart.css";


const CountryRow = (props) => {
    const barStyle = {
      '--from-width': props.country.PrevPopulationPercentage + '%', 
      '--to-width': props.country.CurrPopulationPercentage + '%',
      'animationName': 'grow-or-shrink',
      'animationDuration': '4s',
      'animationFillMode':'forwards'
    };
      
    return ( 
        <div className="grid grid-cols-12 gap-4">
  
        {/* Column 1 displaying the country name */}
        <div className="col-span-2 text-center break-words" >{props.country.Country}</div>

        {/* Column 2 displaying the relative population size to largest as a percentage. This will be displayed as a growing bar */}
        <div className="col-span-8" >
          <div style={barStyle} className="graph-bar h-4 my-1 bg-lime-300/50 border shadow rounded-md border-lime-300"></div>
        </div>

        {/* Column 3 displaying the population size as a number */}
        <div className="col-span-2 text-right break-words" >{props.country.Population}</div>
      </div>
     );
}

export default CountryRow ;