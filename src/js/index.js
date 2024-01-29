import Search from './Search';
import * as searchView from './searchView';
import Recipe from './Recipe';
import * as recipeView from './recipeView';
import Like from './Like';
import * as likeView from './likeView';
import { elements, elementStrings, renderLoader, clearLoader } from './base';
import UserRecipe from './userRecipe';
import * as userView from './userRecipeView';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Liked recipes
 */

const state = {};

// The user SEARCHES for a keyword in the recipe bar
elements.searchForm.addEventListener('submit', (event) => {
  // Prevent default action from occuring, in this case it prevent reloading the page
  // submitting a form.
  event.preventDefault();
  controlSearch();
});

// Render the PREV or NEXT page of results from the recipe result list
elements.searchResultPages.addEventListener('click', (event) => {
  const btn = event.target.closest(`.${elementStrings.btn_inline}`);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage);
  }
});
 
/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.results);
    } catch (error) {
      clearLoader();
      alert(error);
    }
  }
};

/**
 * LIKE CONTROLLER
 */
const controlLike = () => {
  if (!state.like) state.like = new Like();

  const currentID = state.recipe.id;

  // User has not yet liked current recipe
  if (!state.like.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.like.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toggle the like button
    likeView.toggleLikeBtn(true);

    // Add like to UI list
    likeView.renderLike(newLike);

    // User HAS liked current recipe
  } else {
    // Remove like from the state
    state.like.deleteLike(currentID);

    // Toggle the like button
    likeView.toggleLikeBtn(false);

    // Remove like from UI list
    likeView.deleteLikeItem(currentID);
  }

  likeView.toggleLikeMenu(state.like.getNumLikes());
};

// Handling the LIKE button clicks
elements.recipe.addEventListener('click', (event) => {
  if (event.target.matches('.recipe__love, .recipe__love *')) {
    // Add to liked recipe
    controlLike();
  }
});

/**
 * NEW USER RECIPE CONTROLLER
 */
const controlUserRecipe = () => {
  state.userRecipe = new UserRecipe();

  // Show the form to enter the user recipe
  state.userRecipe.toggleUserRecipe();

  // Event handler for exiting out of the recipe form
  [elements.closeUserRecipe, elements.recipeOverlay].forEach((elem) =>
    elem.addEventListener('click', state.userRecipe.toggleUserRecipe)
  );

  // Event handler for submmitting the recipe and rendering the new recipe
  elements.userRecipeForm.addEventListener('submit', userView.submitUserRecipe);
};

// Event handler for clicking on the upload button for user recipes
elements.addRecipeBtn.addEventListener('click', controlUserRecipe);

// Event handler to restore liked recipes AND user recipes on page load
window.addEventListener('load', () => {
  state.like = new Like();
  state.userRecipe = new UserRecipe();

  // Restore likes and user recipes (in constructor)
  state.like.readStorage();

  // Toggle like menu button
  likeView.toggleLikeMenu(state.like.getNumLikes());

  // Render the existing likes and user recipes
  state.like.likes.forEach((curr) => likeView.renderLike(curr));
  state.userRecipe.userRecipes.forEach((curr) => userView.renderUserListItem(curr));
});

/**
 * RECIPE CONTROLLER
 */
// DISPLAY the recipe selected using the hash key from the url
const controlRecipe = async (e) => {
  // Get url from window and split it
  const url = window.location.hash;

  if (url.includes('#recipe')) {
    // When the user clicks on the user recipe, get the ID and render it
    const userRecipeID = url.split('#recipe')[1];

    userView.displayUserRecipe(userRecipeID);
  } else if (url.includes('#')) {
    const inputs = url.split('#')[1];
    const splitInputs = inputs.split('&');
    const id = splitInputs[0];
    const liked = splitInputs[1];

    if (id) {
      // Prepare the UI for changes
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      // Highlight selected search item
      if (state.search && !liked) searchView.highlightSelected(id);

      // Create new recipe object
      state.recipe = new Recipe(id);

      try {
        // Get recipe data
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe, state.like.isLiked(id));
      } catch (error) {
        alert(error);
      }
    }
  }
};

// Render the SELECTED when the user clicks on the recipe using the hash value
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));
