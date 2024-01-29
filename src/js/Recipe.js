import { key } from './config';

const evalString = (string) => {
  return Function('"use strict";return (' + string + ')')();
};

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${this.id}?key=${key}`
      );

      const data = await res.json();

      this.title = data.data.recipe.title;
      this.author = data.data.recipe.publisher;
      this.img = data.data.recipe.image_url;
      this.url = data.data.recipe.source_url;
      this.ingredients = data.data.recipe.ingredients;
      this.time = data.data.recipe.cooking_time;
      this.servings = data.data.recipe.servings;
    } catch (error) {
      alert(error);
    }
  }

  parseIngredients() {
    const newIngredients = this.ingredients.map((el) => {
      // 1) Uniform units
      let ingredient = el.description.toLowerCase();

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      let ingObj;

      // There is BOTH a quantity and a unit
      if (el.quantity != null) {
        ingObj = {
          count: el.quantity,
          unit: el.unit,
          ingredient: ingredient,
        };
      } else {
        ingObj = {
          count: 1,
          unit: el.unit,
          ingredient: ingredient,
        };
      }

      return ingObj;
    });

    this.ingredients = newIngredients;
  }
}
