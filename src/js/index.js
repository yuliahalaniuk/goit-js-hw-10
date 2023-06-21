import { fetchBreeds, getStoredBreeds, initializeSelect } from './api.js';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  errorEl: document.querySelector('.error'),
  catInfoContainer: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.load-js'),
};

function showCatImageAndInformation(catName) {
  const storedBreeds = getStoredBreeds();
  const breed = storedBreeds.find(breed => breed.name === catName);
  if (breed) {
    let index = storedBreeds.indexOf(breed);

    document.getElementById('breed_name').innerHTML = storedBreeds[index].name;
    document.getElementById('breed-descr').textContent =
      storedBreeds[index].description;
    document.getElementById('breed_json').textContent =
      storedBreeds[index].temperament;
    if (storedBreeds[index].image) {
      document.getElementById('cat_image').src = storedBreeds[index].image.url;
    }
  }
}

function selectBreed(data) {
  data.map(breed => {
    let option = `<option value="${breed.name}">${breed.name}</option>`;
    refs.selectEl.insertAdjacentHTML('beforeend', option);
  });
}

refs.catInfoContainer.classList.add('is-hidden');
refs.loaderEl.classList.remove('is-hidden');

fetchBreeds()
  .then(data => {
    refs.selectEl.classList.remove('is-hidden');
    refs.loaderEl.classList.add('is-hidden');

    selectBreed(data);
    initializeSelect();

    refs.selectEl.addEventListener('change', () => {
      const breedId = refs.selectEl.value;

      refs.loaderEl.classList.remove('is-hidden');

      refs.catInfoContainer.classList.add('is-hidden');

      showCatImageAndInformation(breedId);

      refs.loaderEl.classList.add('is-hidden');
      refs.catInfoContainer.classList.remove('is-hidden');
    });
  })
  .catch(error => {
    console.log(error);
    refs.selectEl.classList.add('is-hidden');
    refs.errorEl.classList.remove('is-hidden');
    refs.catInfoContainer.classList.add('is-hidden');
    refs.loaderEl.classList.add('is-hidden');
  });
