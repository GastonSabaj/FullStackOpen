const CountryDetail = ({ name, capital, area, languages, flag , onBack, weatherData }) => {
    return (
      <div>
        <button onClick={onBack}>Back</button>
  
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={flag} alt="flag" width="200" />
        <h2>Weather in {capital}</h2>
        {weatherData ? (
        <div>
            <p>Temperature: {weatherData.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
        ) : (
        <p>No available information</p>
        )}
        
      </div>
    )
}

export default CountryDetail