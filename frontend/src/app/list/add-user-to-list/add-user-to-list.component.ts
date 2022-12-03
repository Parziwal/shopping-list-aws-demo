import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { AddOrRemoveUser } from 'src/app/api/models/add-or-remove-user.model';
import { ShoppingListService } from 'src/app/api/shoppping-list.service';

@Component({
  selector: 'app-add-user-to-list',
  templateUrl: './add-user-to-list.component.html',
  styleUrls: ['./add-user-to-list.component.scss']
})
export class AddUserToListComponent {
  userForm = this.fb.group({
    userEmail: ['', Validators.email],
  });
  loading = false;


  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ShoppingListService,
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<boolean, number>
  ) {}

  cancel() {
    this.context.completeWith(false);
  }

  submit() {
    if (!this.userForm.valid) {
      return;
    }

    this.loading = true;
    this.api
      .addUserToShoppingLists(this.context.data, this.userForm.value as AddOrRemoveUser)
      .subscribe(() => {
        this.loading = false;
        this.context.completeWith(true);
      });
  }
}
