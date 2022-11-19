import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, initializeAuthService } from './auth.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { LogoutCallbackComponent } from './logout-callback/logout-callback.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth-token.interceptor';

@NgModule({
  declarations: [
    LoginCallbackComponent,
    LogoutCallbackComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoginCallbackComponent,
    LogoutCallbackComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthService,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
})
export class AuthModule { }
