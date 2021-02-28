import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

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

  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
