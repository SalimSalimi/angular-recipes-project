import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_AUTH = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private API_KEY = 'AIzaSyA7sbkPEbumREa2aEWTQy2fpBkC2Yw2lDc';
  private SIGN_UP_AUTH_ENDPOINT = this.BASE_AUTH + ':signUp?key=' + this.API_KEY;
  private SIGN_IN_AUTH_ENDPOINT = this.BASE_AUTH + ':signInWithPassword?key=' + this.API_KEY;

  constructor(
    private http: HttpClient
  ) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.SIGN_UP_AUTH_ENDPOINT,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(err => {
      let errorMessage = 'An unknown error occurred!';
      if (!err.error || !err.error.error){
        return throwError(errorMessage);
      }
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This user already exists';
      }
      return throwError(errorMessage);
    }))
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.SIGN_IN_AUTH_ENDPOINT,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }
}
