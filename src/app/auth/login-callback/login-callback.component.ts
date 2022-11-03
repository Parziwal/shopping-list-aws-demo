import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly loaderService: LoaderService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
    ) {}

  async ngOnInit() {
    this.loaderService.showLoader();
    await this.authService.loginCallback();
    this.router.navigate(['']);
    this.loaderService.hideLoader();
    this.alertService
    .open('', {
      label: `Successfully logged in!`,
      status: TuiNotification.Success,
      autoClose: true,
    })
    .subscribe();
  }
}
