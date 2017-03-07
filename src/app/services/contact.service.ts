import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {Contact} from "./contact.resource";
import {ToasterService} from "angular2-toaster";

@Injectable()
export class ContactService {
  page = 1;
  hasMore = true;
  isLoading = false;
  isSaving = false;
  isDeleting = false;
  persons = [];
  search = null;
  sorting = 'name';
  ordering = 'ASC';

  constructor(private contact: Contact, private toaster: ToasterService) {
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
        for (let person of res) {
          this.persons.push(person);
        }
        if (!res) {
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