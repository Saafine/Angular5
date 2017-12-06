import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { layoutRoutes } from './layout.routes';

import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(layoutRoutes),
  ],
})
export class LayoutModule {
}
