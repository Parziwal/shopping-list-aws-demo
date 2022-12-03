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
import { ShoppingListItemComponent } from './list-item/shopping-list-item/shopping-list-item.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { AddEditShoppingItemComponent } from './list-item/add-edit-shopping-item/add-edit-shopping-item.component';
import { AuthModule } from './auth/auth.module';
import { ShoppingListComponent } from './list/shopping-list/shopping-list.component';
import { AddShoppingListComponent } from './list/add-shopping-list/add-shopping-list.component';
import { AddUserToListComponent } from './list/add-user-to-list/add-user-to-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListItemComponent,
    ConfirmationDialogComponent,
    HeaderComponent,
    HomeComponent,
    AddEditShoppingItemComponent,
    AddShoppingListComponent,
    AddUserToListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    TaigaModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}