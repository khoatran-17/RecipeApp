import { elements } from './base';

export default class UserRecipe {
  constructor() {
    this.userRecipes = [];
    this.count = 0;
    this.readStorage();
  }

  toggleUserRecipe() {
    elements.recipeOverlay.classList.toggle('hidden');
    elements.recipeWindow.classList.toggle('hidden');
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('userRecipe'));

    // Restore userRecipes from the local storage
    if (storage) this.userRecipes = storage;
  }
}
