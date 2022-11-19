import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'app-logout-callback',
  templateUrl: './logout-callback.component.html',
  styleUrls: ['./logout-callback.component.scss'],
})
export class LogoutCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['']);
    this.alertService
      .open('', {
        label: `Successfully logged out!`,
        status: TuiNotification.Success,
        autoClose: true,
      })
      .subscribe();
  }
}
