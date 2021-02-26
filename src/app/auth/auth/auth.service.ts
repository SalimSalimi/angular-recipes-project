import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

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
    )
  }
}
