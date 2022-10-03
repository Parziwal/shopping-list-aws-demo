import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ShoppingListService } from '../api/shoppping-list.service';
import { AddShoppingItem } from '../models/add-shopping-item.model';
import { ShoppingItem } from '../models/shopping-item.model';

@Component({
  selector: 'app-edit-shopping-item',
  templateUrl: './edit-shopping-item.component.html',
  styleUrls: ['./edit-shopping-item.component.scss']
})
export class EditShoppingItemComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    amount: [1, Validators.required],
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditShoppingItemComponent>,
    private service: ShoppingListService,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingItem | null) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.form.patchValue(
        {
          name: this.data.name,
          amount: this.data.amount,
          description: this.data.description
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    let observable: Observable<Object>;
    if (this.data != null) {
      observable = this.service.updateShoppingItem(
        this.data.id,
        <AddShoppingItem>{
        ...this.form.value
      });
    } else {
      observable = this.service.createShoppingItem(
        <AddShoppingItem>{
        ...this.form.value
      });
    }

    observable.subscribe(
      () => this.dialogRef.close(true)
    );
  }
}
