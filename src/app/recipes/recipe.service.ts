import {EventEmitter} from "@angular/core";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is a test",
      "https://centslessdeals.com/wp-content/uploads/2018/06/Spinach-Quiche-Recipe-4.jpg",
      [new Ingredient("Tomatoes", 15), new Ingredient("Apples", 12)]),
    new Recipe(
      "Another Test Recipe",
      "This is a second test",
      "https://centslessdeals.com/wp-content/uploads/2018/06/Spinach-Quiche-Recipe-4.jpg",
      [new Ingredient("Oranges", 1), new Ingredient("Bananas", 5)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
