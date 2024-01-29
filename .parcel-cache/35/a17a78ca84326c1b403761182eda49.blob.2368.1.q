var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _base = require('./base');
require('./config');
class addRecipeView {
  constructor() {
    const storage = JSON.parse(localStorage.getItem('userRecipe'));
    storage ? this.userRecipes = storage : this.userRecipes = [];
    this.toggleUserRecipe();
  }
  toggleUserRecipe() {
    _base.elements.recipeOverlay.classList.toggle('hidden');
    _base.elements.recipeWindow.classList.toggle('hidden');
  }
  submitUserRecipe(event) {
    event.preventDefault();
    const formDataArr = [...new FormData(this)];
    const ingredients = formDataArr.filter(input => {
      return input[0].startsWith('ingredient') && input[1] !== '';
    });
    const ingredientsSplit = ingredients.map(ing => {
      const ingArr = ing[1].replaceAll(' ', '').split(',');
      if (ingArr.length !== 3) throw new Error('Ingredient input invalid!');
      return ingArr;
    });
    const newRecipe = Object.fromEntries(formDataArr);
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients: ingredientsSplit
    };
    let allUserRecipes = JSON.parse(localStorage.getItem('userRecipe'));
    console.log('HERE', allUserRecipes);
    if (allUserRecipes) {
      allUserRecipes.push(recipe);
    } else {
      allUserRecipes = [recipe];
    }
    localStorage.setItem('userRecipe', JSON.stringify(allUserRecipes));
  }
}
exports.default = addRecipeView;
