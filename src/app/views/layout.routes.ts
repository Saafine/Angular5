import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const ROUTE_XXX = 'XXX';

export const layoutRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    //children: [
    //  { path: '', component: ViewsSummaryComponent },
    //],
  },
];
