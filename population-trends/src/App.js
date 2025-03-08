import './App.css';
import CountryPopInfo from './CountryPopInfo';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react'


function App() {

  const [currentID, setCurrentID] = useState('US');
  const [currentInput, setCurrentInput] = useState('');
  const [countries, setCountries] = useState ([

    {
      id: 'US',
      name: 'United States'
    },

    { 
      id: 'FRA',
      name: 'France'
    },

    {
      id: 'CAN',
      name: 'Canada'
    },

  ]);

  const changeCountry = (countryID) => {
    setCurrentID(countryID);
  }

  const changeInput = (event) => {
    setCurrentInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const BASE_URL = 'https://api.worldbank.org/v2/country/' + currentInput + '/indicator/SP.POP.TOTL?date=2014:2025&format=json';
        fetch (BASE_URL)
        .then (data => data.json())
        .then (json => {
          if (!json[1] || json[1].length === 0) {
            alert ("Invalid country code! To view the list of all country codes, visit https://wits.worldbank.org/wits/wits/witshelp/content/codes/country_codes.htm");
            return;
          }
          const countryName = json[1][0].country.value;
          const duplicate = countries.some(country => country.name === countryName);
          
          if (duplicate) {
            alert ("This country has already been added!");
            return;
          }
          
          setCountries(prevCountries => [...prevCountries, {id: currentInput, name: countryName}]);
          setCurrentID(currentInput);
          setCurrentInput('');
        })
        .catch (error => alert(error));
  }

  return (
    <div>
      <h1 className="main-header">Population trends in...</h1>
      
      {countries.map( (country) => (
          <div className='row' key={country.id}>
              <div className='col'></div>
                <button className={`col-8 country-button${currentID === country.id ? '-active' : ''}`} key={country.id} onClick={() => setCurrentID(country.id)}>
                  {country.name}
                </button>
              <div className='col'></div>
          </div>
        ))}

      <div className="row form-div">
        <form className="col-12" onSubmit={handleSubmit}>
          <input type="text" onChange={changeInput} value={currentInput} placeholder="country ID (e.g. NOR)"></input>
          <button className="add-country" type="submit">+</button>
        </form>
      </div>

      <CountryPopInfo countryID={currentID}></CountryPopInfo>

    </div>
  );
}

export default App;
