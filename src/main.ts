/* tslint:disable:no-console */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (ENV === 'production') {
  enableProdMode();
} else {
  console.log(ENV);
}

platformBrowserDynamic().bootstrapModule(AppModule);
