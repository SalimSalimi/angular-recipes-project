import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private BASE_URL = 'https://angular-recipes-project-course-default-rtdb.firebaseio.com/';
  private RECIPES_URL = this.BASE_URL + 'recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {
  }

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
    return this.http.get<Recipe[]>(this.RECIPES_URL)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ?
                recipe.ingredients : []
            }
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        }));
  }
}
