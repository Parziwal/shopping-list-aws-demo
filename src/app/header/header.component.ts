import { Component, OnInit } from '@angular/core';
import { tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { User } from 'oidc-client-ts';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    tuiAvatarOptionsProvider({
        size: `m`,
        autoColor: true,
        rounded: true,
    }),
],
})
export class HeaderComponent implements OnInit {

  userInfo: User | null = null;

  constructor(private authService: AuthService) { }
  async ngOnInit() {
    this.userInfo = await this.authService.getUser();
  }

  get isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login();
  }
}
