import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const ROUTE_TEST = 'test';

export const layoutRoutes: Routes = [
  {
    path: '', component: LayoutComponent
  },
];
