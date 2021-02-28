import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    // Loading recipes module/components/routes when visiting 'recipes'
    path: 'recipes',
    //loadChildren: './recipes/recipes.module#RecipesModule'
    // more modern import
    loadChildren: () =>
      import('./recipes/recipes.module').then(m =>
        m.RecipesModule)

  },
  // Lazy loading of ShoppingListModule
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(m =>
        m.ShoppingListModule)
  },
  // Lazy loading of AuthModule
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m =>
        m.AuthModule)
  }

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    // Preloading lazy modules
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
