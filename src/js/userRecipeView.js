import { elements, renderLoader, clearLoader } from './base';
import { limitTitle } from './searchView';
import * as recipeView from './recipeView';

const listItemMarkup = (recipe) => {
  return `
  <li>
      <a class="likes__link glass" href="#recipe${recipe.id}" >
          <figure class="likes__fig">
              <img src="cookUserImg.png" alt="User Recipe Image">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${limitTitle(recipe.title)}</h4>
              <p class="likes__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>
`;
};

export const renderUserListItem = (recipe) => {
  elements.userList.insertAdjacentHTML('beforeend', listItemMarkup(recipe));
};

const getUserRecipeData = (recipeArr) => {
  // Get the ingredients section only and split them into parts
  const ingredients = recipeArr.filter((input) => {
    return input[0].startsWith('ingredient') && input[1] !== '';
  });

  const ingredientsSplit = ingredients.map((ing) => {
    const ingArr = ing[1].split(',');

    if (ingArr.length !== 3) throw new Error('Ingredient input invalid!');

    return ingArr;
  });

  // Get the form data as an object and get the neccessary info
  const newRecipe = Object.fromEntries(recipeArr);

  return {
    title: newRecipe.title,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients: ingredientsSplit,
    id: (Date.now() + '').slice(-10),
  };
};

const addRecipeStorage = (recipe) => {
  let allUserRecipes = JSON.parse(localStorage.getItem('userRecipe'));

  if (allUserRecipes) {
    allUserRecipes.push(recipe);
  } else {
    allUserRecipes = [recipe];
  }

  localStorage.setItem('userRecipe', JSON.stringify(allUserRecipes));
};

export function submitUserRecipe(event) {
  try {
    event.preventDefault();

    // Get all the form data
    const formDataArr = [...new FormData(this)];

    const recipe = getUserRecipeData(formDataArr);

    // Render the newly added recipe
    elements.userList.insertAdjacentHTML('beforeend', listItemMarkup(recipe));

    // // Check if there are user recipes in localstorage and add it
    addRecipeStorage(recipe);

    // Remove the overlay and form
    elements.recipeOverlay.classList.toggle('hidden');
    elements.recipeWindow.classList.toggle('hidden');

    // Clear the inputs in the form
    elements.allInputs.forEach((input) => (input.value = ''));
  } catch (error) {
    window.alert(error);
  }
}

export const displayUserRecipe = (id) => {
  const allUserRecipes = JSON.parse(localStorage.getItem('userRecipe'));

  const recipe = allUserRecipes.find((recipe) => {
    return recipe.id === id;
  });

  // Prepare the UI for changes
  recipeView.clearRecipe();
  renderLoader(elements.recipe);

  renderUserRecipeDetails(recipe);
};

const createIngredient = (ingredient) => `
            <li class="recipe__item">
                <i class='bx bxs-check-square recipe__icon' ></i>
                <div class="recipe__count">${ingredient[0]}</div>
                <div class="recipe__ingredient">
                     <span class="recipe__unit">${ingredient[1]}</span>
                    ${ingredient[2]}
                </div>
            </li>
`;

export const renderUserRecipeDetails = (recipe) => {
  const markup = `
              <figure class="recipe__fig">
                  <img src="cookUserImg.png" class="recipe__img user__recipe__img">
                  <h1 class="recipe__title">
                      <span>${recipe.title}</span>
                  </h1>
              </figure>

              <div class="recipe__details">
                  <div class="recipe__info">
                      <i class='bx bxs-time-five' ></i>
                      <span class="recipe__info-data recipe__info-data--minutes">${
                        recipe.cooking_time
                      }</span>
                      <span class="recipe__info-text"> minutes</span>
                  </div>
                  <div class="recipe__info">
                      <i class='bx bxs-user'></i>
                      <span class="recipe__info-data recipe__info-data--people">${
                        recipe.servings
                      }</span>
                      <span class="recipe__info-text"> servings</span>

                  </div>

                  <div class="user__publisher">
                      <p>By <span class="user__publisher__name">${recipe.publisher}</span></p>
                  </div>
              </div>

              <div class="recipe__ingredients user__ingredients">
                  <ul class="recipe__ingredient-list user__ingredients__list">
                      ${recipe.ingredients.map((ingr) => createIngredient(ingr)).join('')}
                  </ul>
              </div>
      `;

  elements.recipe.classList.add('glass');
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
  clearLoader();
};
