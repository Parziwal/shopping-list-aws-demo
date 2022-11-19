import { Component } from '@angular/core';
import { tuiAvatarOptionsProvider } from '@taiga-ui/kit';
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
export class HeaderComponent {

  constructor(public authService: AuthService) { }
}
