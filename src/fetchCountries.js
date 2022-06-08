export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(r => {
    if (!r.ok) {
      throw new Error(response.statusText);
    }
    return r.json();
  });
}
