import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth/auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'auth', component: AuthComponent
      }
    ])
  ]
})
export class AuthModule {

}
