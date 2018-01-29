import { Routes } from '@angular/router';

export const ROUTE_MAIN = '';

export const ROUTES: Routes = [
  { path: ROUTE_MAIN, loadChildren: './views/layout.module#LayoutModule'},
  { path: '**', redirectTo: '' },
];
