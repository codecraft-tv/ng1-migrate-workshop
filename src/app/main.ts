import './polyfills.ts';
import './app';
import "./services";
import "./filters";
import "./components";
import './app.routes';


import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {CardComponent} from "./components/card.component";
import {Contact} from "./services/contact.resource";
import {toasterServiceProvider} from "./ajs-upgraded-providers"
import {ContactService} from "./services/contact.service";
import {DefaultImagePipe} from "./pipes/default-image.pipe";

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpModule
  ],
  declarations: [
    CardComponent,
    DefaultImagePipe
  ],
  entryComponents: [
    CardComponent
  ],
  providers: [
    Contact,
    ContactService,
    toasterServiceProvider
  ],

})
export class AppModule {
  // Override Angular 2 bootstrap so it doesn't do anything
  ngDoBootstrap() {
  }
}

// Bootstrap using the UpgradeModule
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['codecraft']);
});

