import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaigaModule } from './shared/taiga/taiga.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './list/shopping-list/shopping-list.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { AddEditShoppingItemComponent } from './list/add-edit-shopping-item/add-edit-shopping-item.component';
import { LoginCallbackComponent } from './auth/login-callback/login-callback.component';
import { LogoutCallbackComponent } from './auth/logout-callback/logout-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ConfirmationDialogComponent,
    HeaderComponent,
    HomeComponent,
    AddEditShoppingItemComponent,
    LoginCallbackComponent,
    LogoutCallbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TaigaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
