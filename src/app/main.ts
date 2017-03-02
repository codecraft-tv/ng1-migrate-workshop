import "./polyfills.ts";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {UpgradeModule} from "@angular/upgrade/static";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {RouterModule} from "@angular/router";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {ToasterModule} from "angular2-toaster";
import {CardComponent} from "./components/card.component";
import {SpinnerComponent} from "./components/spinner.component";
import {Contact} from "./services/contact.resource";
import {ContactService} from "./services/contact.service";
import {DefaultImagePipe} from "./pipes/default-image.pipe";
import {LaddaModule} from "angular2-ladda/module/module";
import {PersonListComponent} from "./components/person-list.component";
import {PersonEditComponent} from "./components/person-edit.component";
import {SearchComponent} from "./components/search.component";
import {AppRootComponent} from "./components/app-root.component";
import {routes} from "./app.routes";
import {PersonCreateComponent} from "./components/person-create.component";

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ToasterModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: [
    CardComponent,
    SpinnerComponent,
    PersonListComponent,
    PersonCreateComponent,
    DefaultImagePipe,
    PersonEditComponent,
    SearchComponent,
    AppRootComponent
  ],
  providers: [
    Contact,
    ContactService,
  ],
  bootstrap: [
    AppRootComponent
  ]

})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  console.log("Bootstrapped");
});
