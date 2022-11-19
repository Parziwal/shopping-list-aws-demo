import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  async canActivate(): Promise<boolean> {
      if(this.authService.isLoggedIn) {
        return true;
      }

      await this.authService.login();
      return false;
  }
}
