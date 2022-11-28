import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { filter, lastValueFrom } from 'rxjs';
import { ShoppingListService } from '../../api/shoppping-list.service';
import { ShoppingItem } from '../../api/models/shopping-item.model';
import { TuiDialogService } from '@taiga-ui/core';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddEditShoppingItemComponent } from '../add-edit-shopping-item/add-edit-shopping-item.component';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit {
  shoppingItems: ShoppingItem[] = [];

  constructor(
    private readonly service: ShoppingListService,
    private readonly confirmationDialogtService: ConfirmationDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadShoppingItems();
  }

  loadShoppingItems() {
    this.loaderService.showLoader();
    this.service.listShoppingItems().subscribe(
      (result) => {
        this.shoppingItems = result.Items;
        this.loaderService.hideLoader();
      }
    );
  }

  itemChangeDoneStatus(item: ShoppingItem) {
    item.isActive = !item.isActive;
    this.service.updateShoppingItem(item.id, item).subscribe();
  }

  openAddOrEditDialog(item: ShoppingItem | null = null) {
    this.dialogService
      .open<boolean>(new PolymorpheusComponent(AddEditShoppingItemComponent, this.injector), {
        data: item
      })
      .pipe(filter((result) => result))
      .subscribe(
        () => this.loadShoppingItems()
      );
  }

  deleteItem(item: ShoppingItem) {
    this.confirmationDialogtService
      .showDialog(
        `Are you sure you want to delete '${item.name}' shopping item?`
      )
      .pipe(filter((result) => result))
      .subscribe(async () => {
        await lastValueFrom(this.service.deleteShoppingItem(item.id));
        this.loadShoppingItems();
      });
  }
}
