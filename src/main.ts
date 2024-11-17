/// <reference types="@angular/localize" />

import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)]} )
  .catch((err) => console.error(err));
