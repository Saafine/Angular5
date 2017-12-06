import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';

import '../styles/main.scss';
import { ROUTES } from './app.routes';

// Components
// --------------------
import { AppComponent } from './app.component';
// ----------------------------------------------------

// Modules
// --------------------
// ----------------------------------------------------

// Redux
// --------------------
import { MetaReducer, StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducers } from './app.reducer';
// ----------------------------------------------------

// Testing
// --------------------
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LayoutModule } from './views/layout.module';
export const metaReducers: MetaReducer<any>[] = (ENV === 'production') ? [] : [storeFreeze];
// ----------------------------------------------------

const APP_PROVIDERS = [
];

@NgModule({
  imports: [
    BrowserModule,
    LayoutModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules,
    }),

    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    (ENV === 'production')
      ? []
      : StoreDevtoolsModule.instrument({}),

  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    APP_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
