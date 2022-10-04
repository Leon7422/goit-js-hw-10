import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(extraxtCountryName, DEBOUNCE_DELAY));

function extraxtCountryName(e) {
  const searchArea = e.target.value;

  if (searchArea.trim() === '') {
    return;
  }

  fetchCountries(searchArea.trim())
    .then(data => createAllMarkups(data))
    .catch(e => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createAllMarkups(data) {
  if (!data.length) {
    clearData();
    Notiflix.Notify.failure('Oops, there is no country with that name');
    return;
  } else if (data.length > 10) {
    clearData();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (data.length >= 2 && data.length <= 10) {
    clearData();
    createPreviewMarkup(data);
  } else {
    clearData();
    createFullMarkup(data);
  }
}

function createPreviewMarkup(data) {
  const countryPlace = document.querySelector('.country-list');
  const markup = data
    .map(country => {
      return `<li class="country-list-item"><img class ="country-flag" src="${country.flags.svg}" alt=""><span>${country.name.official}</span></li>`;
    })
    .join('');
  countryPlace.innerHTML = markup;
}

function createFullMarkup(data) {
  const countryPlace = document.querySelector('.country-info');
  const markup = data
    .map(country => {
      return `<div class="head"><img class ="flag" src="${
        country.flags.svg
      }" alt="">
      <span class="country-name">${country.name.official}</span></div>
      <div>Capital: <span>${country.capital}</span></div>
      <div>Population: <span>${country.population} people</span></div>
      <div>Languages: <span>${Object.values(country.languages).join(
        ', '
      )}</span></div>`;
    })
    .join('');
  countryPlace.innerHTML = markup;
}

function clearData() {
  const infoData = document.querySelector('.country-info');
  const listData = document.querySelector('.country-list');
  infoData.innerHTML = ' ';
  listData.innerHTML = ' ';
}
