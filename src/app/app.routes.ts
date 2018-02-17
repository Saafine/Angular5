import { Routes } from '@angular/router';
import { LayoutComponent } from './views/layout.component';

export const ROUTE_XXX = 'XXX';

export const ROUTES: Routes = [
  { path: '', loadChildren: './views/layout.module#LayoutModule' },
  // { path: '', component: LayoutComponent },
  { path: '**', redirectTo: '' },
];


