import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BoardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BoardsComponent }])
  ]
})
export class BoardsModule { }
