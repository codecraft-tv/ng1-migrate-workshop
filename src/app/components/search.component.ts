import * as angular from 'angular';


export let SearchComponent = {
  selector: 'search',
  template: `
<form class="navbar-form navbar-left">

  <div class="form-group">
    <input type="text"
           class="form-control"
           id="name"
           ng-model="$ctrl.search"
           ng-model-options="{ debounce: 300 }"
           placeholder="Search name..."
    />
  </div>

  <div class="form-group">
    <select class="form-control"
            ng-model="$ctrl.sorting">
      <option value="name">Name</option>
      <option value="email">Email</option>
    </select>
  </div>

  <div class="form-group">
    <select class="form-control"
            ng-model="$ctrl.ordering">
      <option value="ASC">ASC</option>
      <option value="DESC">DESC</option>
    </select>
  </div>
</form>
`,
  bindings: {},
  controller: class SearchController {
    private contacts = null;
    private $scope;
    private search: string;
    private ordering: string;
    private sorting: string;

    constructor($scope, ContactService) {
      this.contacts = ContactService;
      this.$scope = $scope;
      this.watchFilters();
    }

    watchFilters() {
      this.$scope.$watch(() => {
        return this.search + this.ordering + this.sorting;
      }, (newVal) => {
        if (angular.isDefined(newVal)) {
          this.contacts.search = this.search;
          this.contacts.ordering = this.ordering;
          this.contacts.sorting = this.sorting;
          this.contacts.doSearch();
        }
      });
    }
  }
};


angular
    .module('codecraft')
    .component(SearchComponent.selector, SearchComponent);
