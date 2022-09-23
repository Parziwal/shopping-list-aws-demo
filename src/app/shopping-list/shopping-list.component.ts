import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ShoppingListService } from '../api/shoppping-list.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditShoppingItemComponent } from '../edit-shopping-item/edit-shopping-item.component';
import { ShoppingItem } from '../models/shopping-item.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  shoppingItems: ShoppingItem[] = [];

  constructor(private service: ShoppingListService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadShoppingItems();
  }

  loadShoppingItems() {
    this.service.listShoppingItems().subscribe(
      (result) => this.shoppingItems = result.Items
    );
  }

  itemActiveStatusChanged(item: ShoppingItem) {
    item.isDone = !item.isDone;
    this.service.updateShoppingItem(item).subscribe();
  }

  openAddOrEditDialog(item: ShoppingItem | null = null) {
    this.dialog.open(EditShoppingItemComponent, {
      width: '250px',
      data: item
    }).afterClosed().pipe(filter((result) => result))
    .subscribe(
      () => this.loadShoppingItems()
    );
  }

  deleteItem(item: ShoppingItem) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete this shpping item?'
      }
    }).afterClosed().pipe(filter(result => result)).subscribe(
      () =>  this.service.deleteShoppingItem(item.id).subscribe(
        () => this.loadShoppingItems()
      )
    );
  }
}
