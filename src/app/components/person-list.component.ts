import * as angular from 'angular';
import {Input, Component} from "@angular/core";
import {downgradeComponent} from "@angular/upgrade/static";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'personList',
  template: `<div class="col-md-12">

  <div class="row"
       infinite-scroll="contacts.loadMore()"
       infinite-scroll-immediate-check="false"
       infinite-scroll-distance="1"
  >

    <ccCard *ngFor="let person of contacts.persons"
            [user]="person">
    </ccCard>

  </div>

  <div *ngIf="contacts.persons.length == 0 && !contacts.isLoading">
    <div class="alert alert-info">
      <p class="text-center">No results found for search term '{{ contacts.search }}'</p>
    </div>
  </div>

  <ccSpinner [isLoading]="contacts.isLoading"
             [message]="'Loading...'"></ccSpinner>
</div>
`
})
export class PersonListComponent {
  constructor(private contacts: ContactService) {
  }
}


angular
    .module('codecraft')
    .directive('personList', downgradeComponent({
      component: PersonListComponent
    }) as angular.IDirectiveFactory);
