import useCountryData from './services/country.js';
import CountryList from './components/countryList.jsx';
import CountryDetail from './components/countryDetails.jsx';

const App = () => {
  const { countrysFilter, countryInput, setCountryInput, setSelectedCountry, selectedCountry, weatherData, fetchCountryData } = useCountryData();
  const handleShowCountry = (countryInput) => {
    fetchCountryData(countryInput.name.common)
    setSelectedCountry(countryInput);
  }

  const handleBackToList = () => {
    setSelectedCountry(null);
  }

  return (
    <div>
      find country: <input value={countryInput} onChange={event => setCountryInput(event.target.value)} />
      {selectedCountry ? (
        <CountryDetail 
          name={selectedCountry.name.common}
          capital={selectedCountry.capital}
          area={selectedCountry.area}
          languages={selectedCountry.languages}
          flag={selectedCountry.flags.png}
          weatherData={weatherData}
          onBack={handleBackToList}
        />
      ) : (
        countrysFilter.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <CountryList countrys={countrysFilter} onShowCountry={handleShowCountry}/>
        )
      )}
    </div>
  )
}

export default App;