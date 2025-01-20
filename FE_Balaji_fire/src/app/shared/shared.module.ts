import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HaderComponent } from './hader/hader.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
