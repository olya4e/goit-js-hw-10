'use strict';
const BASE_URL = 'https://restcountries.com/v3.1';
export const fetchCountries = countryQuery => {
  return fetch(
    `${BASE_URL}/name/${countryQuery}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
