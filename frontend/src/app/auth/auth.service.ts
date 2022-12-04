import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userManager: UserManager;
  private user: User | null = null;

  constructor() {
    this.userManager = new UserManager(this.metadataSeed(environment.authSettings));
  }

  get isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  get userInfo(): User | null {
    return this.user;
  }

  get authorizationHeaderValue(): string {
    if (this.user) {
      return this.user.token_type + ' ' + this.user.id_token;
    }
    
    return '';
  }

  public async login(): Promise<void> {
    this.userManager.signinRedirect();
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

  private metadataSeed(settings: UserManagerSettings): UserManagerSettings {
    const params = new HttpParams()
      .set('client_id', settings.client_id)
      .set('logout_uri', settings.post_logout_redirect_uri!);

    settings.metadataSeed = {
      end_session_endpoint: `https://${environment.amazonCognitoDomain}.auth.us-east-1.amazoncognito.com/logout?${params.toString()}`,
    };

    return settings;
  }
}

export function initializeAuthService(authService: AuthService) {
  return async () => {
    return await authService.refreshUser();
  };
}