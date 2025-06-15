const KEYWORDNIK = 'xr8j3yeo3ne90n7t3ogemkmnzi1rq3i3rtxqigblntcxdnfqv';
const KEYUNSPLASH = 'M4UGF0HCyXwM648EYwnrUPRHeEK-VvhQFWsHf-von-s';

document.addEventListener("DOMContentLoaded", () => { 
  const wordOfDay = document.querySelector('.word-of-day');
  const resultError = document.querySelector('.result-error');
  const spinner = document.querySelector('.spinner');

  function getWordOfTheDay() {
    showSpinner();
    fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${KEYWORDNIK}`)
    .then(response => response.json())
    .then(data => {
      const query = data.word;
      wordOfDay.textContent = data.word;
      searchUnsplash(query);
      hideSpinner();
    })
    .catch((error) => {
      resultError.textContent = `Error fetching word of the day: ${error.message}`;
      hideSpinner();
    });
  }

  function searchUnsplash(query) {
    showSpinner();
    fetch(`https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=20&client_id=${KEYUNSPLASH}`)
      .then(response => response.json())
      .then(data => {
        const getFirstPicture = data.results;
        console.log(getFirstPicture.length + ' results found for query: ' + query);
        if (getFirstPicture.length > 0) {
          const firstPictureUrl = getFirstPicture[0].urls.regular;
          setBackground(firstPictureUrl);
          hideSpinner();
        } else {
            getRandomUnsplash();
        }
      })
      .catch((error) => {
        resultError.textContent = `Error fetching images: ${error.message}`;
        hideSpinner();
      });
  }

  function getRandomUnsplash() {
    showSpinner();
    fetch(`https://api.unsplash.com/photos/random?orientation=landscape&client_id=${KEYUNSPLASH}`)
      .then(response => response.json())
      .then(data => {
          const randomPicture = data.urls.regular;
          setBackground(randomPicture);
          hideSpinner();
        }
      )
      .catch((error) => {
        resultError.textContent = `Error fetching random image: ${error.message}`;
        hideSpinner();
      });
  }

  function setBackground(url) {
    const backgroundBlockImage = document.querySelector('.background-block__image');
    backgroundBlockImage.src = url;
  }

  function showSpinner() {
    spinner.classList.remove('hidden');
  }

  function hideSpinner() {
    spinner.classList.add('hidden');
  }

  getWordOfTheDay();
});