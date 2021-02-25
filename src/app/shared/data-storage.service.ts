import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private BASE_URL = 'https://angular-recipes-project-course-default-rtdb.firebaseio.com/';
  private RECIPES_URL = this.BASE_URL + 'recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      this.RECIPES_URL,
      recipes
    ).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(this.RECIPES_URL)
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
  }
}
