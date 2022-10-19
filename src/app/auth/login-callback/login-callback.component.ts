import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  async ngOnInit() {
    await this.authService.loginCallback();
    this.router.navigate(['']);
  }
}
