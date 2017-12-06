import { Routes } from '@angular/router';
export const ROUTES: Routes = [
  { path: '', loadChildren: './views/layout.module#LayoutModule' },
];


