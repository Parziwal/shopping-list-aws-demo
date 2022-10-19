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

  public async getUser(): Promise<User | null> {
    this.user = await this.userManager.getUser();
    return await this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public async loginCallback() {
    this.user = await this.userManager.signinRedirectCallback();
    return this.user;
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
