import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { ShoppingListService } from 'src/app/api/shoppping-list.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ShoppingItem } from 'src/app/api/models/shopping-item.model';
import { Observable } from 'rxjs';
import { AddOrEditShoppingItem } from 'src/app/api/models/add-shopping-item.model';

@Component({
  selector: 'app-add-edit-shopping-item',
  templateUrl: './add-edit-shopping-item.component.html',
  styleUrls: ['./add-edit-shopping-item.component.scss'],
})
export class AddEditShoppingItemComponent implements OnInit {
  itemForm = this.fb.group({
    name: ['', Validators.required],
    amount: [1, Validators.required],
    description: ['', Validators.required],
  });
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ShoppingListService,
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<boolean, ShoppingItem | null>
  ) {}

  ngOnInit(): void {
    if (this.context.data != null) {
      this.itemForm.patchValue({
        name: this.context.data.name,
        amount: this.context.data.amount,
        description: this.context.data.description,
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
    if (this.context.data != null) {
      observable = this.service.updateShoppingItem(
        this.context.data.id,
        {...this.itemForm.value as AddOrEditShoppingItem, isDone: this.context.data.isDone},
      );
    } else {
      observable = this.service.createShoppingItem({
        ...(this.itemForm.value as AddOrEditShoppingItem),
        isDone: false,
      });
    }

    this.loading = true;
    observable.subscribe(() =>
    {
      this.loading = false;
      this.context.completeWith(true);
    });
  }
}
