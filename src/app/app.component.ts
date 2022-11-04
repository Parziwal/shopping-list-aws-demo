import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  private loaderSub: Subscription | null = null;

  constructor(
    private readonly loaderService: LoaderService,
    private readonly authService: AuthService,
    private readonly changeDetector: ChangeDetectorRef) {}

  async ngOnInit() {
    this.loaderSub = this.loaderService.loadingStatus.subscribe(
      (status) => {
        this.loading = status;
        this.changeDetector.detectChanges();
      }
    );

    this.loaderService.showLoader();
    await this.authService.refreshUser();
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    this.loaderSub?.unsubscribe();
  }
}
