import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Recipe} from "../recipes/recipe.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // take method with value 1 = it takes only 1 value of subscription and it's unsubscribe by itself
    // exhaustmap provides a way to return another Observable
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams()
            .set('auth', user.token ? user.token : '')
        });
        return next.handle(modifiedReq);
      }));
  }
}
