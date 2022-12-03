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
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss'],
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
export class ShoppingListItemComponent implements OnInit {
  listId!: number;
  shoppingItems: ShoppingItem[] = [];

  constructor(
    private readonly api: ShoppingListService,
    private readonly confirmationDialog: ConfirmationDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private readonly loader: LoaderService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = +params['listId'];
      this.loadShoppingItems();
    });
  }

  loadShoppingItems() {
    this.loader.showLoader();
    this.api.listShoppingItems(this.listId).subscribe((result) => {
      this.shoppingItems = result.Items;
      this.loader.hideLoader();
    });
  }

  itemChangeDoneStatus(item: ShoppingItem) {
    item.isActive = !item.isActive;
    this.api.editShoppingListItem(this.listId, item.id, item).subscribe();
  }

  openAddOrEditDialog(item: ShoppingItem | null = null) {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddEditShoppingItemComponent, this.injector),
        {
          data: {
            listId: this.listId,
            item: item,
          },
        }
      )
      .pipe(filter((result) => result))
      .subscribe(() => this.loadShoppingItems());
  }

  deleteItem(item: ShoppingItem) {
    this.confirmationDialog
      .showDialog(
        `Are you sure you want to delete '${item.name}' shopping item?`
      )
      .pipe(filter((result) => result))
      .subscribe(async () => {
        await lastValueFrom(
          this.api.deleteShoppingListItem(this.listId, item.id)
        );
        this.loadShoppingItems();
      });
  }
}
