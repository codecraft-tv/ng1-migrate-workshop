import * as angular from 'angular';
import {Input, Component, Inject} from "@angular/core";
import {downgradeComponent} from "@angular/upgrade/static";
import {ContactService} from "../services/contact.service";
import {
    UIRouterStateParams,
    UIRouterState
} from "../ajs-upgraded-providers"
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'personEdit',
  templateUrl: 'app/components/person-edit.component.html'
})
export class PersonEditComponent {
  @Input()
  private mode: string;

  private person: any = {};

  constructor(private contacts: ContactService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['email']) {
        this.person = this.contacts.getPerson(params['email']);
      }
    });
  }

  save() {
    this.contacts.updateContact(this.person)
        .then(() => {
          this.router.navigate(['']);
        })
  }

  remove() {
    this.contacts.removeContact(this.person)
        .then(() => {
          this.router.navigate(['']);
        })
  }
}


angular
    .module('codecraft')
    .directive('personEdit', downgradeComponent({
      inputs: ['mode'],
      component: PersonEditComponent
    }) as angular.IDirectiveFactory);