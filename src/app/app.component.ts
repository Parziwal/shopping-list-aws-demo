import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    public readonly loaderService: LoaderService,
    public readonly authService: AuthService) {}

  async ngOnInit() {
    this.loaderService.showLoader();
    await this.authService.refreshUser();
    this.loaderService.hideLoader();
  }
}
