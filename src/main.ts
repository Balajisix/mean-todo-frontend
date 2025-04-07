import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ]
})
.then(() => {
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('push-sw.js')
      .then(registration => {
        console.log('Push Service worked with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('Push Service Worker registration failed:', error);
      });
  }
})
.catch((err) => console.error(err));
