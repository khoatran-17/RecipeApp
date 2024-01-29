import { key } from './config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${this.query}&key=${key}`
      );

      const data = await res.json();

      this.results = data.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
