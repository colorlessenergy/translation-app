const wordList = [
  {
    english: 'the',
    spanish: 'el',
    italian: 'il',
    portuguese: 'o',
    french: 'le'
  },
  {
    english: 'of',
    spanish: 'de',
    italian: 'di',
    portuguese: 'de',
    french: 'de'
  },
  {
    english: 'a',
    spanish: 'un',
    italian: 'un',
    portuguese: 'um',
    french: 'un'
  },
  {
    english: 'be',
    spanish: 'ser',
    italian: 'essere',
    portuguese: 'ser',
    french: 'être'
  },
  {
    english: 'and',
    spanish: 'y',
    italian: 'e',
    portuguese: 'e',
    french: 'et'
  },
  {
    english: 'at',
    spanish: 'a',
    italian: 'a',
    portuguese: 'a',
    french: 'à'
  },
  {
    english: '',
    spanish: '',
    italian: '',
    portuguese: '',
    french: ''
  }
];



function displayWords () {
  const wordsForSingleLanguage = document.querySelector('#words-for-single-language');
  const allWords = document.querySelector('#all-words');
  const currentLanguage = document.querySelector('#current-language');

  return function (language) {
    // clear the words before repopulating
    wordsForSingleLanguage.innerHTML = '';
    allWords.innerHTML = '';


    currentLanguage.textContent = language;

    if (language === 'all') {
      wordList.forEach(function displayWord(word, index) {
        let createDiv = document.createElement('div');

        // use this div to display the language before all the words 
        let createDivForLanguages = document.createElement('div');

        // loop through the object to display all the words
        for (let key in word) {

          if (index == 0) {
            let createPTag = document.createElement('p');
            createPTag.textContent = key;
            createDivForLanguages.appendChild(createPTag);
          }

          let createPTag = document.createElement('p');
          createPTag.textContent = word[key];
          createDiv.appendChild(createPTag);
        }

        if (index === 0) allWords.appendChild(createDivForLanguages);

        allWords.appendChild(createDiv);
      });
    } else {
      wordList.forEach(function displayWord(word, index) {
        let lengthOfIndex = index.toString().length;
        let currentPosition = '';

        if (lengthOfIndex === 1) {
          currentPosition = `000${index}`;
        } else if (lengthOfIndex === 2) {
          currentPosition = `00${index}`;
        } else if (lengthOfIndex === 3) {
          currentPosition = `0${index}`;
        } else {
          currentPosition = index;
        }

        let createPTag = document.createElement('p');
        createPTag.textContent = `${currentPosition} ${word[language]}`;

        wordsForSingleLanguage.appendChild(createPTag);
      });
    }
  }
  
}

const form = document.querySelector('form');

const setup = displayWords()

form.addEventListener('change', function (e) {

  // if a language was already selected before remove the class to show it
  let alreadyHidden = document.querySelector('.hide-current-language');
  if (alreadyHidden) {
    alreadyHidden.classList.toggle('hide-current-language');
  }

  // show the flag of the langauge

  let flagImage = document.querySelector('#flag-image');
  flagImage.src = `assets/${e.target.id}-flag.png`;

  // hide the element from the drop down
  let radioContiner = document.querySelector(`#${e.target.id}-form-group`);
  radioContiner.classList.toggle('hide-current-language');


  setup(e.target.id);
});


// by default it is english
setup('english');
