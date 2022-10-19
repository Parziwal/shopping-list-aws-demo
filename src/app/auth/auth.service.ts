import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userManager: UserManager;
  private user: User | null = null;

  constructor(private http: HttpClient) {
    this.userManager = new UserManager(environment.authSettings);
  }

  get isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  get userInfo() {
    return this.user;
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public async refreshUser(): Promise<void> {
    this.user = await this.userManager.getUser();
  }

  public async loginCallback(): Promise<void> {
    this.user = await this.userManager.signinRedirectCallback();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
