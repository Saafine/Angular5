import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const declareAndExport = [

];

/**
 * Make sure you add a component to both IMPORTS and EXPORTS
 */
@NgModule({
  declarations: [
    ...declareAndExport
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...declareAndExport
  ],
})
export class SharedModule {
}
