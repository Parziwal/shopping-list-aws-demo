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
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiTagModule,
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
    TuiIslandModule,
    TuiTagModule,
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
    TuiAlertModule,
    TuiIslandModule,
    TuiTagModule,
  ],
})

export class TaigaModule { }
