import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { filter } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ShoppingList } from 'src/app/api/models/shopping-list.model';
import { ShoppingListService } from 'src/app/api/shoppping-list.service';
import { AddShoppingListComponent } from '../add-shopping-list/add-shopping-list.component';
import { AddUserToListComponent } from '../add-user-to-list/add-user-to-list.component';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  shoppingLists: ShoppingList[] = [];

  constructor(
    private readonly api: ShoppingListService,
    private readonly confirmationDialog: ConfirmationDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private readonly loader: LoaderService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loadShoppingLists();
  }

  loadShoppingLists() {
    this.loader.showLoader();
    this.api.listShoppingLists().subscribe((result) => {
      this.shoppingLists = result.Items;
      this.loader.hideLoader();
    });
  }

  shoppingListClicked(listId: number) {
    this.router.navigate(['/shopping-list', listId]);
  }

  newShoppingList() {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddShoppingListComponent, this.injector)
      )
      .pipe(filter((result) => result))
      .subscribe(() => this.loadShoppingLists());
  }

  deleteShoppingList(list: ShoppingList) {
    this.confirmationDialog
      .showDialog(
        `Are you sure you want to delete '${list.name}' shopping list?`
      )
      .pipe(filter((result) => result))
      .subscribe(() => {
        this.api
          .deleteShoppingList(list.id)
          .subscribe(() => this.loadShoppingLists());
      });
  }

  addUserToList(listId: number) {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddUserToListComponent, this.injector),
        {
          data: listId,
        }
      )
      .pipe(filter((result) => result))
      .subscribe(() => this.loadShoppingLists());
  }

  removeUserFromList(list: ShoppingList, userEmail: string) {
    this.confirmationDialog
      .showDialog(
        `Are you sure you want to remove '${userEmail}' from '${list.name}' shopping list?`
      )
      .pipe(filter((result) => result))
      .subscribe(() => {
        this.api
          .removeUserFromShoppingLists(list.id, { userEmail: userEmail })
          .subscribe(() => this.loadShoppingLists());
      });
  }
}
