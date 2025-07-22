import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.config';
import { environment } from '@env/environment';
import hljs from 'highlight.js/lib/common';

if (environment.production) {
  enableProdMode();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ngsw-worker.js');
  }
}

(window as any).hljs = hljs;

fetch('env.json')
  .then((response) => response.json())
  .then((env) => {
    console.log(env);
    bootstrapApplication(AppComponent, appConfig(env)).catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error('Error loading env.json:', error);
    bootstrapApplication(AppComponent, appConfig({})).catch((err) => console.error(err));
  });
