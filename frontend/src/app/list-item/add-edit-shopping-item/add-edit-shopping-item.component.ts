import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { ShoppingListService } from 'src/app/api/shoppping-list.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ShoppingItem } from 'src/app/api/models/shopping-item.model';
import { Observable } from 'rxjs';
import { AddOrEditShoppingItem } from 'src/app/api/models/add-or-edit-shopping-item.model';

@Component({
  selector: 'app-add-edit-shopping-item',
  templateUrl: './add-edit-shopping-item.component.html',
  styleUrls: ['./add-edit-shopping-item.component.scss'],
})
export class AddEditShoppingItemComponent implements OnInit {
  itemForm = this.fb.group({
    name: ['', Validators.required],
    quantity: [1, Validators.required],
    description: [''],
  });
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ShoppingListService,
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<
      boolean,
      { listId: number; item: ShoppingItem | null }
    >
  ) {}

  ngOnInit(): void {
    if (this.context.data.item != null) {
      this.itemForm.patchValue({
        name: this.context.data.item.name,
        quantity: this.context.data.item.quantity,
        description: this.context.data.item.description,
      });
    }
  }

  cancel() {
    this.context.completeWith(false);
  }

  submit() {
    if (!this.itemForm.valid) {
      return;
    }

    let observable: Observable<Object>;
    if (this.context.data.item != null) {
      observable = this.api.editShoppingListItem(
        this.context.data.listId,
        this.context.data.item.id,
        {
          ...(this.itemForm.value as AddOrEditShoppingItem),
          isActive: this.context.data.item.isActive,
        }
      );
    } else {
      observable = this.api.addItemToShoppingList(
        this.context.data.listId,
        this.itemForm.value as AddOrEditShoppingItem
      );
    }

    this.loading = true;
    observable.subscribe(() => {
      this.loading = false;
      this.context.completeWith(true);
    });
  }
}
