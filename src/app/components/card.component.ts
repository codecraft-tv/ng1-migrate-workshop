import * as angular from 'angular';

let CodeCraftCardComponent = {
  selector: 'ccCard',
  template: `
<div class="col-md-6" >
  <div class="well well-sm" >
    <div class="row" >
      <div class="col-md-4" >
        <img ng-src="{{ $ctrl.user.photo }}"
             alt=""
             class="img-rounded img-responsive" />
      </div >
      <div class="col-md-8" >
        <h4 >{{ $ctrl.user.name }}
          <i class="fa"
             ng-class="{'fa-female':$ctrl.user.sex == 'F', 'fa-male': $ctrl.user.sex == 'M'}" ></i >
        </h4 >
        <small >{{ $ctrl.user.city }}, {{ $ctrl.user.country }}
          <i class="fa fa-map-marker" ></i >
        </small >
        <p >
          <i class="fa fa-envelope-o" ></i >
					{{ $ctrl.user.email }}
          <br />
          <i class="fa fa-gift" ></i >
					{{ $ctrl.user.birthdate | date:"longDate"}}
        </p >


					<button type="button"
					        class="btn btn-default btn-sm"
							    ui-sref="edit({email:user.email})">
						<i class="fa fa-pencil"></i>&nbsp;Edit
					</button >

					<button type="button"
					        class="btn btn-danger btn-sm"
					        ladda="$ctrl.isDeleting"
							    ng-click="$ctrl.deleteUser()">
						<i class="fa fa-trash"></i>&nbsp;Delete
					</button >

      </div >
    </div >
  </div >
</div >
`,
  bindings: {
    'user': '='
  },
  controller: class CodeCraftCardController {
    private ContactService;
    private isDeleting;
    private user;

    constructor(ContactService) {
      this.ContactService = ContactService;
      this.isDeleting = false;
    }

    deleteUser() {
      this.isDeleting = true;
      this.ContactService.removeContact(this.user).then(() => {
        this.isDeleting = false;
      });
    };
  }
};


angular
    .module('codecraft')
    .component(CodeCraftCardComponent.selector, CodeCraftCardComponent);