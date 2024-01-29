export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResultList: document.querySelector('.results__list'),
  searchResult: document.querySelector('.results'),
  searchResultPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  likeIcon: document.querySelector('.recipe__love'),
  likeMenu: document.querySelector('.likes__field'),
  likeList: document.querySelector('.likes__list'),
  addRecipeBtn: document.querySelector('.nav__btn--add-recipe'),
  recipeWindow: document.querySelector('.add-recipe-window'),
  recipeOverlay: document.querySelector('.overlay'),
  closeUserRecipe: document.querySelector('.btn--close'),
  userRecipeForm: document.querySelector('.upload'),
  userList: document.querySelector('.user__list'),
  allInputs: document.querySelectorAll('.upload__column input'),
};

export const elementStrings = {
  loader: 'loader',
  btn_inline: 'btn-inline',
  resultsLink: 'results__link',
  resultsLinkActive: 'results__link--active',
};

export const renderLoader = (parent) => {
  const loader = `
    <div class="${elementStrings.loader}">
      <i class='bx bx-loader-circle' ></i>
    </div>
    `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
