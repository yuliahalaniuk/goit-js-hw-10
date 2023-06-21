import {
  fetchBreeds,
  getStoredBreeds,
  initializeSelect,
  fetchOneBreed,
  fetchCatImg,
} from './api.js';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  errorEl: document.querySelector('.error'),
  catInfoContainer: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.load-js'),
};

function showCatImageAndInformation({ name, description, temperament, image }) {
  document.getElementById('breed_name').innerHTML = name;
  document.getElementById('breed-descr').textContent = description;
  document.getElementById('breed_json').textContent = temperament;
}

function showCatImg(image) {
  document.getElementById('cat_image').src = image.url;
}

function selectBreed(data) {
  data.map(breed => {
    let option = `<option value="${breed.name}">${breed.name}</option>`;
    refs.selectEl.insertAdjacentHTML('beforeend', option);
  });
}

function getBreedIdByName(breedName) {
  const storedBreeds = getStoredBreeds();
  const breedId = storedBreeds.find(breed => breed.name === breedName).id;
  return breedId;
}

function onError(error) {
  console.log(error);
  refs.selectEl.classList.add('is-hidden');
  refs.errorEl.classList.remove('is-hidden');
  refs.catInfoContainer.classList.add('is-hidden');
  refs.loaderEl.classList.add('is-hidden');
}

function onSelectChange(e) {
  let breedIdFinal = getBreedIdByName(e.currentTarget.value);

  fetchOneBreed(breedIdFinal)
    .then(data => {
      showCatImageAndInformation(data);

      fetchCatImg(breedIdFinal)
        .then(img => {
          showCatImg(...img);
        })
        .catch(error => {
          onError(error);
        });

      refs.loaderEl.classList.add('is-hidden');
      refs.catInfoContainer.classList.remove('is-hidden');
    })
    .catch(error => {
      onError(error);
    });

  refs.loaderEl.classList.remove('is-hidden');
  refs.catInfoContainer.classList.add('is-hidden');
}

refs.catInfoContainer.classList.add('is-hidden');
refs.loaderEl.classList.remove('is-hidden');

fetchBreeds()
  .then(data => {
    refs.selectEl.classList.remove('is-hidden');
    refs.loaderEl.classList.add('is-hidden');

    selectBreed(data);
    initializeSelect();

    refs.selectEl.addEventListener('change', onSelectChange);
  })
  .catch(error => {
    onError(error);
  });
