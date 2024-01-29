import { elements, elementStrings } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.searchResultPages.innerHTML = '';
};

export const highlightSelected = (id) => {
  const resultsArr = Array.from(document.querySelectorAll(`.${elementStrings.resultsLink}`));
  resultsArr.forEach((el) => el.classList.remove(elementStrings.resultsLinkActive));

  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add(elementStrings.resultsLinkActive);
};

export const limitTitle = (title, limit = 25) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
      }
      return acc + curr.length;
    }, 0);

    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const createButton = (page, type) => {
  let buttonMarkup;

  if (type === 'hidden') {
    buttonMarkup = `<button class="${elementStrings.btn_inline} results__btn--hidden">
                      <span>HiddenBtn</span>
                    </button>`;
  } else {
    buttonMarkup = `<button class="${elementStrings.btn_inline} results__btn--${type}" data-goto=${
      type === 'prev' ? page - 1 : page + 1
    }>
              <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>

              <i class='bx bxs-skip-${
                type === 'prev' ? 'previous' : 'next'
              }-circle search__icon' ></i>
          </button>
`;
  }

  return buttonMarkup;
};

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // Button to go to next page
    button = `
    ${createButton(page, 'hidden')}
    ${createButton(page, 'next')}
    `;
  } else if (page < pages) {
    // Both buttons
    button = `
    ${createButton(page, 'prev')}
    ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Button to go to previous page
    button = createButton(page, 'prev');
  }

  elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

const renderRecipe = (currRecipe) => {
  const markup = `
          <li class="glass">
            <a class="results__link" href="#${currRecipe.id}">
              <figure class="results__fig">
                <img src="${currRecipe.image_url}" alt="${currRecipe.title}">
              </figure>
              <div class="results__data">
                <h4 class="results__name">${limitTitle(currRecipe.title)}</h4>
                <p class="results__author">${currRecipe.publisher}</p>
              </div>
            </a>
          </li>
          `;

  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipesArr, page = 1, resPerPage = 8) => {
  // Redner results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipesArr.slice(start, end).forEach((curr) => renderRecipe(curr));

  // Render pagination buttons
  renderButtons(page, recipesArr.length, resPerPage);
};
