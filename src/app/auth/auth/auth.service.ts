import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_AUTH = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private API_KEY = 'AIzaSyA7sbkPEbumREa2aEWTQy2fpBkC2Yw2lDc';
  private SIGN_AUTH_ENDPOINT = this.BASE_AUTH + this.API_KEY;

  constructor(
    private http: HttpClient
  ) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.SIGN_AUTH_ENDPOINT,
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
}
