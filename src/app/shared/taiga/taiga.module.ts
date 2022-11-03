import { NgModule } from '@angular/core';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiButtonModule,
  TuiGroupModule,
  TuiSvgModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiAlertModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiAvatarModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';



@NgModule({
  declarations: [],
  imports: [
    TuiRootModule,
    TuiLoaderModule,
    TuiDialogModule,
    TuiGroupModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiButtonModule,
    TuiAvatarModule,
  ],
  exports: [
    TuiRootModule,
    TuiLoaderModule,
    TuiDialogModule,
    TuiGroupModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiButtonModule,
    TuiAvatarModule,
    TuiAlertModule,
  ],
})

export class TaigaModule { }
