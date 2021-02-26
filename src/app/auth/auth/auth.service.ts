import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";

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

  // user = new Subject<User>();
  // @ts-ignore
  user = new BehaviorSubject<User>(null);

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
    ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
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
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }))
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This user already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Your credentials are incorrect'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Your credentials are incorrect'
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }
}
