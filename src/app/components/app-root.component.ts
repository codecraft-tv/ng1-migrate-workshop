import * as angular from 'angular';
import {Input, Component} from "@angular/core";
import {downgradeComponent} from "@angular/upgrade/static";

@Component({
  selector: 'app-root',
  template: `
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand"
         href="/">Contacts
      </a>
    </div>

    <div ui-view="search">
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav navbar-right">
        <li ui-sref-active="active">
          <a ui-sref="list">Search</a>
        </li>
        <li ui-sref-active="active">
          <a ui-sref="create">Create</a>
        </li>
      </ul>
    </div>

  </div>
</nav>

<div class="container main-content">

  <toaster-container></toaster-container>

  <div class="row">

    <div ui-view="main">
    </div>

  </div>
</div>
`
})
export class AppRootComponent {

}

angular
    .module('codecraft')
    .directive('appRoot', downgradeComponent({
      component: AppRootComponent
    }) as angular.IDirectiveFactory);