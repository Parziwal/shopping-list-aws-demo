import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public readonly loaderService: LoaderService,
    private authService: AuthService) {}

  async ngOnInit() {
    this.loaderService.showLoader();
    await this.authService.refreshUser();
    this.loaderService.hideLoader();
  }
}
