
import { useState, useEffect } from 'react';
import axios from 'axios';


const useCountryData = () => {
  const [countryValues, setCountryValues] = useState();
  const [countrysFilter, setCountrysFilter] = useState([]);
  const [countryInput, setCountryInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const apiKeyOpenWeatherMap = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

  const fetchCountryData = async (countryName) => {
    try {
        const countryResponse = await axios.get(`${baseURL}/name/${countryName}`);
        const capitalCity = countryResponse.data.capital;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKeyOpenWeatherMap}`);
        setSelectedCountry(countryResponse.data);
        setWeatherData(weatherResponse.data);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const initializeCountryValues = async () => {
    try {
      const response = await axios.get(`${baseURL}/all`);
      setCountryValues(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //Para inicializar el valor de CountryValues
  useEffect(() => {
    initializeCountryValues();
  },[])

  //Para filtrar los paises
  useEffect(() => {
    if (countryValues) {
      const filteredCountries = countryValues.filter(c =>
        c.name.common.toLowerCase().includes(countryInput.toLowerCase())
      )
      setCountrysFilter(filteredCountries)
    }
  }, [countryInput, countryValues]);

  //Para mostrar la informacion del pais filtrado, siendo el unico con ese nombre
  useEffect(() => {
    if (countrysFilter.length === 1) {
      const countryName = countrysFilter[0].name.common;
      fetchCountryData(countryName);
    } else {
      setSelectedCountry(null);
      setWeatherData(null);
    }
  }, [countrysFilter]);

  return { countrysFilter, countryInput, setCountryInput,setSelectedCountry, selectedCountry, weatherData, fetchCountryData };
};

export default useCountryData;