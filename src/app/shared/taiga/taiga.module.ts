import { NgModule } from '@angular/core';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiButtonModule,
  TuiGroupModule,
  TuiSvgModule,
  TuiErrorModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
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
  ],
})

export class TaigaModule { }
