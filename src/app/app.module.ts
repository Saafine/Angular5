import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import '../styles/main.scss';
import { ROUTES } from './app.routes';

// Components
// --------------------
// ----------------------------------------------------

// Modules
// --------------------
import { SharedModule } from './shared/shared.module';
// ----------------------------------------------------

// Redux
// --------------------
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// ----------------------------------------------------

// Providers
// --------------------
import { TestService } from './services/test.service';
import { AppComponent } from './app.component';


// Other
// --------------------
export const metaReducers: MetaReducer<any>[] = (ENV === 'production') ? [] : [storeFreeze];
// ----------------------------------------------------

const APP_PROVIDERS = [
  TestService
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules,
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension.
     */
    (ENV === 'production')
      ? []
      : StoreDevtoolsModule.instrument({}),
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
