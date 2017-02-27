import * as angular from 'angular';
import {Injectable, Inject} from "@angular/core";
import {downgradeInjectable} from '@angular/upgrade/static';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Toaster} from "../ajs-upgraded-providers";
import {Contact} from "./contact.resource";

@Injectable()
export class ContactService {
  private page = 1;
  private hasMore = true;
  private isLoading = false;
  private isSaving = false;
  private isDeleting = false;
  private selectedPerson = null;
  private persons = [];
  private search = null;
  private sorting = 'name';
  private ordering = 'ASC';


  constructor(private contact: Contact, @Inject(Toaster) private toaster) {
    this.loadContacts();
  }

  getPerson(email) {
    for (let person of this.persons) {
      if (person.email == email) {
        return person;
      }
    }
  }

  doSearch() {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  loadContacts() {
    if (this.hasMore && !this.isLoading) {
      this.isLoading = true;

      let params = {
        '_page': this.page,
        '_sort': this.sorting,
        "_order": this.ordering,
        'q': this.search
      };

      this.contact.query(params).then((res) => {
        console.log(res);
        angular.forEach(res, (person) => {
          this.persons.push(person);
        });
        if (!res.data) {
          this.hasMore = false;
        }
        this.isLoading = false;
      });
    }

  };

  loadMore() {
    if (this.hasMore && !this.isLoading) {
      this.page += 1;
      this.loadContacts();
    }
  };

  updateContact(person) {
    return new Promise((resolve, reject) => {
      this.isSaving = true;
      this.contact.update(person).then(() => {
        this.isSaving = false;
        this.toaster.pop('success', 'Updated ' + person.name);
        resolve()
      });
    });
  };

  removeContact(person) {
    return new Promise((resolve, reject) => {
      this.isDeleting = true;
      this.contact.remove(person).then(() => {
        this.isDeleting = false;
        var index = this.persons.indexOf(person);
        this.persons.splice(index, 1);
        this.selectedPerson = null;
        this.toaster.pop('success', 'Deleted ' + person.name);
        resolve()
      });
    });
  };

  createContact(person) {
    return new Promise((resolve, reject) => {
      this.isSaving = true;
      this.contact.save(person).then(() => {
        this.isSaving = false;
        this.selectedPerson = null;
        this.hasMore = true;
        this.page = 1;
        this.persons = [];
        this.loadContacts();
        this.toaster.pop('success', 'Created ' + person.name);
        resolve()
      });
    });
  };

}


angular
    .module('codecraft')
    .factory('ContactService', downgradeInjectable(ContactService));
