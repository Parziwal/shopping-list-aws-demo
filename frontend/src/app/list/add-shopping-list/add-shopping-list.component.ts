import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { AddShoppingList } from 'src/app/api/models/add-shopping-list.model';
import { ShoppingListService } from 'src/app/api/shoppping-list.service';

@Component({
  selector: 'app-add-shopping-list',
  templateUrl: './add-shopping-list.component.html',
  styleUrls: ['./add-shopping-list.component.scss'],
})
export class AddShoppingListComponent {
  listForm = this.fb.group({
    name: ['', Validators.required],
  });
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ShoppingListService,
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<boolean>
  ) {}

  cancel() {
    this.context.completeWith(false);
  }

  submit() {
    if (!this.listForm.valid) {
      return;
    }

    this.loading = true;
    this.api
      .createShoppingList(this.listForm.value as AddShoppingList)
      .subscribe(() => {
        this.loading = false;
        this.context.completeWith(true);
      });
  }
}
