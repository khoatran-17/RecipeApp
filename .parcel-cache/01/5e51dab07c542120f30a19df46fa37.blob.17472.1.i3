var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getInput", function () {
  return getInput;
});
_parcelHelpers.export(exports, "clearInput", function () {
  return clearInput;
});
_parcelHelpers.export(exports, "clearResults", function () {
  return clearResults;
});
_parcelHelpers.export(exports, "highlightSelected", function () {
  return highlightSelected;
});
_parcelHelpers.export(exports, "limitTitle", function () {
  return limitTitle;
});
_parcelHelpers.export(exports, "renderResults", function () {
  return renderResults;
});
var _base = require('./base');
const getInput = () => _base.elements.searchInput.value;
const clearInput = () => {
  _base.elements.searchInput.value = '';
};
const clearResults = () => {
  _base.elements.searchResultList.innerHTML = '';
  _base.elements.searchResultPages.innerHTML = '';
};
const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll(`.${_base.elementStrings.resultsLink}`));
  resultsArr.forEach(el => el.classList.remove(_base.elementStrings.resultsLinkActive));
  document.querySelector(`.results__link[href="#${id}"]`).classList.add(_base.elementStrings.resultsLinkActive);
};
const limitTitle = (title, limit = 30) => {
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
const createButton = (page, type) => `
          <button class="${_base.elementStrings.btn_inline} results__btn--${type} glass" data-goto=${type === 'prev' ? page - 1 : page + 1}>
              <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>

              <i class='bx bxs-skip-${type === 'prev' ? 'previous' : 'next'}-circle search__icon' ></i>
          </button>
`;
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // Button to go to next page
    button = createButton(page, 'next');
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
  _base.elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};
const renderRecipe = currRecipe => {
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
  _base.elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};
const renderResults = (recipesArr, page = 1, resPerPage = 8) => {
  // Redner results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipesArr.slice(start, end).forEach(curr => renderRecipe(curr));
  // Render pagination buttons
  renderButtons(page, recipesArr.length, resPerPage);
};
