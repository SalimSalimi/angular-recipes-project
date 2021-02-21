import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A Test Recipe", "This is a test", "https://centslessdeals.com/wp-content/uploads/2018/06/Spinach-Quiche-Recipe-4.jpg"),
    new Recipe("A Test Recipe", "This is a test", "https://centslessdeals.com/wp-content/uploads/2018/06/Spinach-Quiche-Recipe-4.jpg")
  ];
  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
