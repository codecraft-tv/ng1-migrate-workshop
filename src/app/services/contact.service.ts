import * as angular from 'angular';
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {downgradeInjectable} from '@angular/upgrade/static';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// @Injectable()
export class ContactService {
  private Contact;
  private $rootScope;
  private $q;
  private toaster;
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


  constructor(Contact, $q, toaster) {
    this.Contact = Contact;
    this.$q = $q;
    this.toaster = toaster;
    this.loadContacts();
  }

  getPerson(email) {
    debugger;
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

      this.Contact.query(params).then((res) => {
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
    let d = this.$q.defer();
    this.isSaving = true;
    this.Contact.update(person).then(() => {
      this.isSaving = false;
      this.toaster.pop('success', 'Updated ' + person.name);
      d.resolve()
    });
    return d.promise;
  };

  removeContact(person) {
    let d = this.$q.defer();
    this.isDeleting = true;
    this.Contact.remove(person).then(() => {
      this.isDeleting = false;
      var index = this.persons.indexOf(person);
      this.persons.splice(index, 1);
      this.selectedPerson = null;
      this.toaster.pop('success', 'Deleted ' + person.name);
      d.resolve()
    });
    return d.promise;
  };

  createContact(person) {
    let d = this.$q.defer();
    this.isSaving = true;
    this.Contact.save(person).then(() => {
      this.isSaving = false;
      this.selectedPerson = null;
      this.hasMore = true;
      this.page = 1;
      this.persons = [];
      this.loadContacts();
      this.toaster.pop('success', 'Created ' + person.name);
      d.resolve()
    });
    return d.promise;
  };

}


angular
    .module('codecraft')
    .service('ContactService', ContactService);
