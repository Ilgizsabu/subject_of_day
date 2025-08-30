const KEYWORDNIK = 'xr8j3yeo3ne90n7t3ogemkmnzi1rq3i3rtxqigblntcxdnfqv';
const KEYUNSPLASH = 'M4UGF0HCyXwM648EYwnrUPRHeEK-VvhQFWsHf-von-s';

document.addEventListener("DOMContentLoaded", () => {
  const wordOfDay = document.querySelector('.word-of-day');
  const resultError = document.querySelector('.result-error');
  const spinner = document.querySelector('.spinner');
  const bgrBlockImage = document.querySelector('.background-block__image');

  function showSpinner() { spinner.classList.remove('hidden'); }
  function hideSpinner() { spinner.classList.add('hidden'); }

  async function getWordOfTheDay() {
    const response = await fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${KEYWORDNIK}`);
    if(!response.ok) { throw new Error(`HTTP error! status: ${response.status} for getWordOfTheDay`); }

    const dataWord = await response.json();
    if(!dataWord.word) return null;

    const word = dataWord.word;
    return word;
  };

  async function getUnsplashByWord(word) {
    const q = encodeURIComponent(word);

    const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${q}&client_id=${KEYUNSPLASH}`);
    if(!response.ok) { throw new Error(`HTTP error! status: ${response.status} for getUnsplashByWord`); }

    const dataImg = await response.json();
    if(!dataImg) { throw new Error('No image found for getUnsplashByWord')};

    const url = dataImg.urls.regular;
    return url;
  };

  async function getRandomUnsplash(wordRandom) {
    const q = encodeURIComponent(wordRandom);

    const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${q}&client_id=${KEYUNSPLASH}`);
    if(!response.ok) { throw new Error(`HTTP error! status: ${response.status} for getRandomUnsplash`); }

    const data = await response.json();
    if(!data) { throw new Error('No image found for getRandomUnsplash')};

    const url = data.urls.regular;
    return url;
  }

  function setBackground(url) {
    if(!url) return;
    bgrBlockImage.src = url;
    bgrBlockImage.alt = 'Background image from Unsplash';
  };

  async function main() {
    showSpinner();
    try {
      const word = await getWordOfTheDay();
      const wordRandom = 'nature';
      const img = word ? await getUnsplashByWord(word) : await getRandomUnsplash(wordRandom);
      setBackground(img);
    } catch (error) {
      resultError.textContent = `Error fetching: ${error.message}`;
    } finally {
      hideSpinner();
    }
  };

  main();
});