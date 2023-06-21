import SlimSelect from 'slim-select';

const API_KEY =
  'live_O3927UMSCDVSRuluvYEl6wyouVSOgxj6c4DrHJplcQRK4TDCAy8pUdXT2avFrmMs';

const BASE_URL = `https://api.thecatapi.com/v1/breeds`;

let storedBreeds = [];

export function fetchBreeds() {
  return fetch(BASE_URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => response.json())
    .then(data => {
      storedBreeds = data;
      return storedBreeds;
    });
}

export function getStoredBreeds() {
  return storedBreeds;
}

export function initializeSelect() {
  selectEl = document.querySelector('.breed-select');
  new SlimSelect({
    select: selectEl,
    settings: {
      placeholderText: 'Choose a cat breed',
    },
  });
}
