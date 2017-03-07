import {Component} from "@angular/core";
import {ContactService} from "../services/contact.service";
import {Router} from "@angular/router";

@Component({
  selector: 'personCreate',
  templateUrl: 'app/components/person-edit.component.html'
})
export class PersonCreateComponent {
  private person: any;

  constructor(private contacts: ContactService,
              private router: Router) {
    this.person = {};
  }

  save() {
    this.contacts.createContact(this.person)
        .then(() => {
          this.router.navigate(['']);
        })
  }
}