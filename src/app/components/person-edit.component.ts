import * as angular from 'angular';
import {Input, Component, Inject} from "@angular/core";
import {downgradeComponent} from "@angular/upgrade/static";
import {ContactService} from "../services/contact.service";
import {
    UIRouterStateParams,
    UIRouterState
} from "../ajs-upgraded-providers"

@Component({
  selector: 'personEdit',
  templateUrl: 'app/components/person-edit.component.html'
})
export class PersonEditComponent {
  @Input()
  private mode: string;

  private person: any;

  constructor(@Inject(UIRouterStateParams) private $stateParams,
              @Inject(UIRouterState) private $state,
              private contacts: ContactService) {
    this.person = this.contacts.getPerson(this.$stateParams.email);
  }

  save() {
    this.contacts.updateContact(this.person)
        .then(() => {
          this.$state.go("list");
        })
  }

  remove() {
    this.contacts.removeContact(this.person)
        .then(() => {
          this.$state.go("list");
        })
  }
}


angular
    .module('codecraft')
    .directive('personEdit', downgradeComponent({
      inputs: ['mode'],
      component: PersonEditComponent
    }) as angular.IDirectiveFactory);