import { elements } from './base';

export const clearRecipe = () => (elements.recipe.innerHTML = '');

const createIngredient = (ingredient) => `
            <li class="recipe__item">
                <i class='bx bxs-check-square recipe__icon' ></i>
                <div class="recipe__count">${ingredient.count}</div>
                <div class="recipe__ingredient">
                     <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.ingredient}
                </div>
            </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <i class='bx bxs-time-five' ></i>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <i class='bx bxs-user'></i>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                </div>
                <button class="recipe__love">
                    <i class="bx ${isLiked ? 'bxs' : 'bx'}-heart" ></i>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map((el) => createIngredient(el)).join('')}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was created by
                    <span class="recipe__by">${
                      recipe.author
                    }</span>. Find out more details about the recipe below.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <i class='bx bxs-book-content'></i>
                </a>
            </div>
    `;

  elements.recipe.classList.add('glass');
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
