import * as angular from 'angular';

export let PersonEditComponent = {
  selector: 'personEdit',
  templateUrl: 'app/components/person-edit.component.html',
  bindings: {
    'mode' : '='
  },
  controller: class PersonEditController {
    private contacts = null;
    private $state = null;
    private $stateParams = null;


    constructor($stateParams, $state, ContactService) {
      this.$stateParams = $stateParams;
      this.$state = $state;
      this.contacts = ContactService;
      this.contacts.selectedPerson = this.contacts.getPerson(this.$stateParams.email);
    }

    save() {
      this.contacts.updateContact(this.contacts.selectedPerson)
          .then(() => {
            this.$state.go("list");
          })
    }

    remove() {
      this.contacts.removeContact(this.contacts.selectedPerson)
          .then(() => {
            this.$state.go("list");
          })
    }

  }
};


angular
    .module('codecraft')
    .component(PersonEditComponent.selector, PersonEditComponent);