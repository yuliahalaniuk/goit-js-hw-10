const API_KEY =
  'live_O3927UMSCDVSRuluvYEl6wyouVSOgxj6c4DrHJplcQRK4TDCAy8pUdXT2avFrmMs';

const BASE_URL = `https://api.thecatapi.com/v1`;

let storedBreeds = [];

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, {
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

export function fetchOneBreed(breedId) {
  return fetch(`${BASE_URL}/breeds/${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

export function fetchCatImg(breedId) {
  return fetch(`${BASE_URL}/images/search?${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => response.json())
    .then(img => {
      return img;
    });
}

export function getStoredBreeds() {
  return storedBreeds;
}
