import { EventEmitter } from "@angular/core";

import {Recipe} from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("A Test Recipe", "This is a test", "https://centslessdeals.com/wp-content/uploads/2018/06/Spinach-Quiche-Recipe-4.jpg"),
    new Recipe("Another Test Recipe", "This is a second test", "https://centslessdeals.com/wp-content/uploads/2018/06/Spinach-Quiche-Recipe-4.jpg")
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
