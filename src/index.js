import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import createCountryCard from './templates/countryCard.hbs';
import createCountryList from './templates/countryList.hbs';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const onCountrySearchSubmit = e => {
  const countryQuery = e.target.value.trim();
  if (countryQuery === '') {
    clearEl();
    return;
  }
  fetchCountries(countryQuery)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearEl();
        return;
      }
      if (data.length === 1) {
        data.map(el => {
          el.languages = Object.values(el.languages).join(' , ');
          countryListEl.style.display = 'none';
        });
        countryInfoEl.innerHTML = data
          .map(el => createCountryCard(el))
          .join('');
      } else {
        countryInfoEl.innerHTML = '';
        countryListEl.style.display = 'flex';
        countryListEl.innerHTML = data
          .map(el => createCountryList(el))
          .join('');
      }
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearEl();
      }
    });
};
function clearEl() {
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
}
inputEl.addEventListener(
  'input',
  debounce(onCountrySearchSubmit, DEBOUNCE_DELAY)
);
