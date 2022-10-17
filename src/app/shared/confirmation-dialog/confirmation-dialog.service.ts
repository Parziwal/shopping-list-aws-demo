import { Inject, Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  showDialog(title: string) {
    return this.dialogService.open<boolean>(
      new PolymorpheusComponent(ConfirmationDialogComponent, this.injector),
      {
          data: title,
          size: 'm'
      },
    );
  }
}
