import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(responce => responce.json())
    .catch(e => {
      console.log(e);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
