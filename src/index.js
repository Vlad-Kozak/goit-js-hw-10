const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('[id="search-box"]');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValue = e.target.value.trim();

  if (!inputValue) return;

  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  fetchCountries(inputValue)
    .then(r => {
      if (r.length > 10)
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );

      if (r.length > 1) {
        return countryListMarkup(r);
      }

      countryInfoMarkup(r);
    })
    .catch(r => Notify.failure('Oops, there is no country with that name'));
}

function countryListMarkup(r) {
  const markup = r
    .map(({ flags, name }) => {
      console.log(flags.svg, name.official);
      return `
      <li class="country-item">
        <img class="country-flag" src="${flags.svg}"></img>
        <p class="country-name">${name.common}</p>
      </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function countryInfoMarkup(r) {
  const markup = r
    .map(({ flags, name, population, languages, capital }) => {
      console.log(
        flags.svg,
        name.official,
        population,
        Object.values(languages).join(', '),
        Object.values(capital).join(', ')
      );
      return `
    <div>
      <img class="country-flag" src="${flags.svg}"></img>
      <span class="country-name">${name.common}</span>
      <p class="">Capital:
        <span>${Object.values(capital).join(', ')}</span>
      </p>
      <p class="">Population:
        <span>${population}</span>
      </p>
      <p class="">Languages:
        <span>${Object.values(languages).join(', ')}</span>
      </p>
    </div>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
