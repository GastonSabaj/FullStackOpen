const CountryList = ({ countrys, onShowCountry }) => {
    return (
      <ul>
        {countrys.map(country => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => onShowCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
    )
}

export default CountryList