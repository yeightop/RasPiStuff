import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './account.component';


@NgModule({
  // We will need to declare our component to our module so that it knows what data it should transfer out of the file.
  declarations: [ TagComponent ],
  imports: [
    CommonModule
  ],
  // The export will tell us what Components to add when we import our module
  exports: [ TagComponent ]
})
export class TagModule { }
